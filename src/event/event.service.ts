import { Injectable } from "@nestjs/common";
import { interval, Observable, Subject } from "rxjs";

@Injectable()
export class EventService {
  private testEvent: Record<string, Subject<MessageEvent>> = {};

  //  Constructor
  constructor() {
    // 모든 사용자에게 주기적으로 메시지를 보내는 interval 설정
    interval(3000).subscribe(() => {
      for (const id in this.testEvent) {
        const event = new MessageEvent("message", { data: `Periodic event for ID: ${id}` });
        this.sendTestEvent(id, event);
      }
    });
  }

  //  사용자에게 메시지를 받는 함수
  handleConnetcion(id: string): Observable<MessageEvent> {
    if (!this.testEvent[id]) this.testEvent[id] = new Subject<MessageEvent>();
    return this.testEvent[id].asObservable();
  }

  //  사용자에게 메시지를 보내는 함수
  sendTestEvent(id: string, event: MessageEvent) {
    console.log("sendTestEvent", id, event, this.testEvent);
    if (this.testEvent[id]) this.testEvent[id].next(event);
    else console.log("no id");
  }
}
