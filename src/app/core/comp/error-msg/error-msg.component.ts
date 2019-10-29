import { Component, OnInit, ElementRef } from '@angular/core';
import { ErrorMsgService } from '../../services/error-msg.service';

@Component({
  selector: 'lp-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss'],
})
export class ErrorMsgComponent implements OnInit {
  z = 0;
  msg: string = '';
  i;

  constructor(
    private elRef: ElementRef,
    private errorMsgService: ErrorMsgService
  ) {}

  ngOnInit() {
    this.errorMsgService.errorMsg.subscribe(msg => {
      this.msg = msg;
      this.showMsg();
    });
  }

  showMsg() {
    clearInterval(this.i);
    this.z = 0;
    this.elRef.nativeElement.style.transform = 'translateY(0)';
    this.i = setInterval(() => {
      this.z += 1;
      if (this.z == 100) {
        clearInterval(this.i);
        this.elRef.nativeElement.style.transform = 'translateY(-115%)';
      }
    }, 100);
  }
}
