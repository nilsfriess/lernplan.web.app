import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorMsgService {
  errorMsg = new Subject<string>();

  constructor() {}

  showMsg(msg: string) {
    this.errorMsg.next(msg);
  }
}
