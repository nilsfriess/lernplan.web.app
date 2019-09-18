import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lp-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  toggleTheme() {
    if (localStorage.getItem('useDarkTheme') == 'enabled') {
      document.body.classList.remove('useDarkTheme');
      localStorage.setItem('useDarkTheme', 'disabled');
    } else {
      document.body.classList.add('useDarkTheme');
      localStorage.setItem('useDarkTheme', 'enabled');
    }
  }
}
