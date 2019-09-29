import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingBarService } from './loading-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private loadingBarService: LoadingBarService
  ) {
    this.afAuth.authState.subscribe(() => {
      this.loadingBarService.setLoadingStatus(false);
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['']);
      });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  createAccount(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
