import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    emailCtrl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    passwordCtrl: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private loadingBarService: LoadingBarService
  ) {}

  ngOnInit() {}

  submitForm(email: string, password: string) {
    if (this.loginFormGroup.valid) {
      this.loadingBarService.setLoadingStatus(true);
      this.authService
        .signIn(email, password)
        .then(() => {
          this.loadingBarService.setLoadingStatus(false);
        })
        .catch(e => {
          this.loadingBarService.setLoadingStatus(false);
          this.handleErrorMsg(e);
        });
    }
  }

  handleErrorMsg(e) {
    switch (e.code) {
      case 'auth/wrong-password':
        this.loginFormGroup.controls['passwordCtrl'].setErrors({
          wrongPassword: true,
        });
        break;
      case 'auth/user-not-found':
        this.loginFormGroup.controls['emailCtrl'].setErrors({
          userNotFound: true,
        });
        break;
      default:
        this.loginFormGroup.controls['emailCtrl'].setErrors({
          unknownError: true,
        });
    }
  }
}
