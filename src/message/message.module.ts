import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MassageGateway } from "./message.gateway";

@Module({
  providers: [MessageService]
})
export class MessageModule {}
