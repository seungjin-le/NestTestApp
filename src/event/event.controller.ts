import { controller } from "@/utils/apiDecorators";
import { Body, Post, Sse } from "@nestjs/common";
import { interval, map, Observable } from "rxjs";
import { EventService } from "./event.service";

@controller("이벤트", "api/v1/event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Sse("sse")
  sse(@Body("id") id: string): Observable<MessageEvent> {
    return this.eventService.handleConnetcion(id).pipe(map((event: MessageEvent) => event));
  }

  @Post("send")
  sendTestEvent(@Body("id") id: string, @Body("msg") msg: string) {
    const message = new MessageEvent("message", { data: msg });
    this.eventService.sendTestEvent(id, message);
  }
}
