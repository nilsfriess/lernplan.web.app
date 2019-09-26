import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'lp-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  darkThemeActivated: Boolean = false;
  userMail;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userMail = this.authService.afAuth.auth.currentUser.email;
    if (localStorage.getItem('useDarkTheme') == 'enabled') {
      this.darkThemeActivated = true;
    }
  }

  toggleTheme() {
    if (localStorage.getItem('useDarkTheme') == 'enabled') {
      document.body.classList.remove('useDarkTheme');
      localStorage.setItem('useDarkTheme', 'disabled');
      this.darkThemeActivated = false;
    } else {
      document.body.classList.add('useDarkTheme');
      localStorage.setItem('useDarkTheme', 'enabled');
      this.darkThemeActivated = true;
    }
  }

  signOut() {
    this.authService.signOut();
  }
}
