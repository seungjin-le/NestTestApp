import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketService } from './socket.service';
import { JoinRoomDto, LeaveRoomDto, SocketMessageDto } from "@/socket/dto/socket.dto";

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },
  transports: ['websocket'],
})
@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server): void {
    this.logger.log('WebSocket Gateway initialized');
    this.socketService.setServer(server);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);
    this.socketService.handleConnection(client);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`클라이언트 연결 해제됨: ${client.id}`);
    this.socketService.handleDisconnection(client);
  }

  /**
   * 메시지를 수신하는 함수
   * @param messageDto 메시지 DTO
   * @param client Socket 클라이언트
   */
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() messageDto: SocketMessageDto,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    try {
      this.logger.log(`메시지 수신 - 클라이언트: ${client.id}, 메시지: ${messageDto.message}`);

      await this.socketService.handleMessage(messageDto, client);

      // 특정 방에 메시지 전송 또는 전체 브로드캐스트
      if (messageDto.room) {
        this.server.to(messageDto.room).emit('message', {
          message: messageDto.message,
          clientId: client.id,
          room: messageDto.room,
          timestamp: new Date().toISOString(),
        });
      } else {
        this.server.emit('message', {
          message: messageDto.message,
          clientId: client.id,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      this.logger.error(`메시지 처리 오류: ${error.message}`, error.stack);
      client.emit('error', { message: '메시지 처리 중 오류가 발생했습니다.' });
    }
  }

  /**
   * 로그인 후 로그인된 사용자를 토큰으로 가지는 room에 접속
   * @param joinRoomDto 방 참여 DTO
   * @param client Socket 클라이언트
   */
  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    try {
      const { room } = joinRoomDto;

      await client.join(room);
      await this.socketService.addClientToRoom(client.id, room);

      this.logger.log(`클라이언트 ${client.id}가 방 ${room}에 참여했습니다`);

      // 방에 있는 다른 사용자들에게 알림
      client.to(room).emit('userJoined', {
        clientId: client.id,
        room,
        message: `새로운 사용자가 방에 참여했습니다.`,
        timestamp: new Date().toISOString(),
      });

      // 참여한 사용자에게 확인 메시지
      client.emit('joinedRoom', {
        room,
        message: `${room} 방에 성공적으로 참여했습니다.`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`방 참여 오류: ${error.message}`, error.stack);
      client.emit('error', { message: '방 참여 중 오류가 발생했습니다.' });
    }
  }

  /**
   * 로그인 후 로그인된 사용자를 토큰으로 가지는 room에서 제거
   * @param leaveRoomDto 방 나가기 DTO
   * @param client Socket 클라이언트
   */
  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() leaveRoomDto: LeaveRoomDto,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    try {
      const { room } = leaveRoomDto;

      await client.leave(room);
      await this.socketService.removeClientFromRoom(client.id, room);

      this.logger.log(`클라이언트 ${client.id}가 방 ${room}을 나갔습니다`);

      // 방에 있는 다른 사용자들에게 알림
      this.server.to(room).emit('userLeft', {
        clientId: client.id,
        room,
        message: `사용자가 방을 나갔습니다.`,
        timestamp: new Date().toISOString(),
      });

      // 나간 사용자에게 확인 메시지
      client.emit('leftRoom', {
        room,
        message: `${room} 방을 나갔습니다.`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`방 나가기 오류: ${error.message}`, error.stack);
      client.emit('error', { message: '방 나가기 중 오류가 발생했습니다.' });
    }
  }

  /**
   * 특정 방의 사용자 목록 조회
   * @param room 방 이름
   * @param client Socket 클라이언트
   */
  @SubscribeMessage('getRoomUsers')
  async handleGetRoomUsers(
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    try {
      const users = await this.socketService.getRoomUsers(room);
      client.emit('roomUsers', {
        room,
        users,
        count: users.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`방 사용자 조회 오류: ${error.message}`, error.stack);
      client.emit('error', { message: '방 사용자 조회 중 오류가 발생했습니다.' });
    }
  }
}