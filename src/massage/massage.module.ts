import { Module } from "@nestjs/common";
import { MessageService } from "./massage.service";
import { MassageGateway } from "./massage.gateway";

@Module({
  providers: [MessageService]
})
export class MessageModule {}
