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

  @SubscribeMessage('join')
  handleJoin(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.join(room);
    console.log(`Client joined room: ${room}`);
    this.server.to(room).emit('message', `A new client has joined the room: ${room}`);
  }

  @SubscribeMessage('leave')
  handleLeave(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.leave(room);
  
    this.server.to(room).emit('message', `A client has left the room: ${room}`);
  }
}