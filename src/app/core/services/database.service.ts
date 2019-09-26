import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private authService: AuthService,
    private afFirestore: AngularFirestore
  ) {}

  getAllTasks() {
    return new Promise<any>((resolve, reject) => {
      let userId = this.authService.afAuth.auth.currentUser.uid;
      if (userId == '') reject(new Error('Unexpected error occured'));
      this.afFirestore
        .collection(`users/${userId}/tasks`)
        .valueChanges()
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  createNewTask(task) {
    console.log(1);
    return new Promise((resolve, reject) => {
      let userId = this.authService.afAuth.auth.currentUser.uid;
      if (userId == '') reject(new Error('Unexpected error occured'));
      this.afFirestore
        .collection(`users/${userId}/tasks`)
        .add(task)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  }
}
