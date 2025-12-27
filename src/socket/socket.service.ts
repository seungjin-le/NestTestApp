import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketMessageDto } from "@/socket/dto/socket.dto";


interface ClientInfo {
  id: string;
  connectedAt: Date;
  rooms: Set<string>;
}

/**
 * @description SocketService 소켓 서비스
 * @param server Server 서버
 * @param clients Map<string, ClientInfo> 클라이언트 정보
 * @param rooms Map<string, Set<string>> 방 정보
 * @param logger Logger 로거
 */
@Injectable()
export class SocketService {
  private server: Server;
  private clients: Map<string, ClientInfo> = new Map();
  private rooms: Map<string, Set<string>> = new Map();
  private readonly logger = new Logger(SocketService.name);

  setServer(server: Server): void {
    this.server = server;
  }

    /**
     * @description 클라이언트 연결 처리
     * @param client Socket 클라이언트
     */
  handleConnection(client: Socket): void {
    const clientInfo: ClientInfo = {
      id: client.id,
      connectedAt: new Date(),
      rooms: new Set(),
    };
    
    this.clients.set(client.id, clientInfo);
    this.logger.log(`총 연결된 클라이언트 수: ${this.clients.size}`);
  }


  /**
   * @description 클라이언트 연결 해제 처리
   * @param client Socket 클라이언트
   */
  handleDisconnection(client: Socket): void {
    const clientInfo = this.clients.get(client.id);
    
    if (clientInfo) {
      // 클라이언트가 속한 모든 방에서 제거
      clientInfo.rooms.forEach(room => {
        this.removeClientFromRoom(client.id, room);
      });
    }
    
    this.clients.delete(client.id);
    this.logger.log(`총 연결된 클라이언트 수: ${this.clients.size}`);
  }


  /**
   * @description 메시지 처리
   * @param messageDto SocketMessageDto 메시지 DTO
   * @param client Socket 클라이언트
   */
  async handleMessage(messageDto: SocketMessageDto, client: Socket): Promise<void> {
    // 메시지 처리 로직 (예: 데이터베이스 저장, 로깅 등)
    this.logger.log(`메시지 처리 - 클라이언트: ${client.id}, 내용: ${messageDto.message}`);
    
    // 여기에 메시지 저장, 필터링 등의 비즈니스 로직을 추가할 수 있습니다.
  }

  async addClientToRoom(clientId: string, room: string): Promise<void> {
    const clientInfo = this.clients.get(clientId);
    if (clientInfo) {
      clientInfo.rooms.add(room);
    }

    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    
    this.rooms.get(room)?.add(clientId);
    this.logger.log(`방 ${room}에 클라이언트 ${clientId} 추가됨`);
  }

  async removeClientFromRoom(clientId: string, room: string): Promise<void> {
    const clientInfo = this.clients.get(clientId);
    if (clientInfo) {
      clientInfo.rooms.delete(room);
    }

    const roomClients = this.rooms.get(room);
    if (roomClients) {
      roomClients.delete(clientId);
      
      // 방이 비어있으면 제거
      if (roomClients.size === 0) {
        this.rooms.delete(room);
      }
    }
    
    this.logger.log(`방 ${room}에서 클라이언트 ${clientId} 제거됨`);
  }

  async getRoomUsers(room: string): Promise<string[]> {
    const roomClients = this.rooms.get(room);
    return roomClients ? Array.from(roomClients) : [];
  }

  getConnectedClientsCount(): number {
    return this.clients.size;
  }

  getRoomsCount(): number {
    return this.rooms.size;
  }

  getClientRooms(clientId: string): string[] {
    const clientInfo = this.clients.get(clientId);
    return clientInfo ? Array.from(clientInfo.rooms) : [];
  }
}