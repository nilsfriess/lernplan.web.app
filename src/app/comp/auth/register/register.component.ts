import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';

@Component({
  selector: 'lp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingBarService: LoadingBarService
  ) {}

  ngOnInit() {}

  submitForm(email: string, password: string) {
    this.loadingBarService.setLoadingStatus(true);
    this.authService
      .createAccount(email, password)
      .then(() => {
        this.loadingBarService.setLoadingStatus(false);
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.loadingBarService.setLoadingStatus(false);
      });
  }
}
