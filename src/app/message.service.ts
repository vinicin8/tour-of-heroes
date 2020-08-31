import { switchMap } from 'rxjs/operators';

import { Injectable} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  private msg = new Subject<any>();

  add(message: string) {
   // this.messages.push(message);
   this.msg.next(this.messages.push(message));
  }

  clear() {
   //this.messages = [];
  this.msg.next(this.messages = []);
  }
}
