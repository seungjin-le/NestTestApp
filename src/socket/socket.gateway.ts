import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  /**
   * 메시지를 수신하는 함수
   * @param message 메시지
   * @param client Socket
   */
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    console.log('Received message:', message);
    this.server.emit('message', message);
  }

  /**
   * 로그인 후 로그인된 사용자를 토큰로 가지는 room에 접속
   * @param room 
   * @param client 
   */
  @SubscribeMessage('join')
  handleJoin(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.join(room);
    console.log(`Client joined room: ${room}`);
    this.server.to(room).emit('message', `A new client has joined the room: ${room}`);
  }

  /**
   * 로그인 후 로그인된 사용자를 토큰로 가지는 room에서 제거
   * @param room 
   * @param client 
   */
  @SubscribeMessage('leave')
  handleLeave(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.leave(room);
  
    this.server.to(room).emit('message', `A client has left the room: ${room}`);
  }
}