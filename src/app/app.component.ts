import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';
import { DatabaseService } from './core/services/database.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'lp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(
          ':leave',
          [style({ opacity: 1 }), animate('0.16s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.16s', style({ opacity: 1 }))],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'lernplan';

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {
    document.body.style.height = document.body.clientHeight + 'px';
    this.databaseService;
    this.authService;
  }
}
