import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  loadingStatus = new Subject<Boolean>();

  constructor() {}

  setLoadingStatus(x: Boolean) {
    setTimeout(() => {
      this.loadingStatus.next(x);
    }, 250);
  }
}
