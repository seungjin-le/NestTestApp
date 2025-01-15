import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  
}
