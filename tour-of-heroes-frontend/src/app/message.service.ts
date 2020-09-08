import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  private msg = new Subject<any>();

  add(message: string) {
   this.msg.next(this.messages.push(message));
  }

  clear() {
   this.msg.next(this.messages = []);
  }
}
