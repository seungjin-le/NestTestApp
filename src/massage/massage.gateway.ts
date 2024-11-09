import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(80, { namespace: "massage" })
export class MassageGateway {
  @SubscribeMessage("massage")
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
