import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';

@Component({
  selector: 'lp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loadingBarService: LoadingBarService
  ) {}

  ngOnInit() {}

  submitForm(email: string, password: string) {
    this.loadingBarService.setLoadingStatus(true);
    this.authService
      .signIn(email, password)
      .then(() => {
        this.loadingBarService.setLoadingStatus(false);
      })
      .catch(() => {
        this.loadingBarService.setLoadingStatus(false);
      });
  }
}
