import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private tasks: ReplaySubject<any> = new ReplaySubject();

  constructor(
    private authService: AuthService,
    private afFirestore: AngularFirestore
  ) {
    this.afFirestore.firestore.enablePersistence();
    this.authService.afAuth.authState.subscribe(user => {
      if (user) {
        this.afFirestore
          .collection(`users/${user.uid}/tasks`)
          .valueChanges()
          .subscribe(data => {
            this.tasks.next(data);
          });
      }
    });
  }

  getAllTasks(): ReplaySubject<any> {
    return this.tasks;
    /*
    return new Promise<any>((resolve, reject) => {
      let userId = this.authService.afAuth.auth.currentUser.uid;
      if (userId == '') reject(new Error('Unexpected error occured'));
      this.afFirestore
        .collection(`users/${userId}/tasks`)
        .valueChanges()
        .subscribe(data => {
          resolve(data);
        });
    });*/
  }

  createNewTask(task) {
    console.log(1);
    return new Promise((resolve, reject) => {
      let userId = this.authService.afAuth.auth.currentUser.uid;
      if (userId == '') reject(new Error('Unexpected error occured'));
      this.afFirestore
        .collection(`users/${userId}/tasks`)
        .add(task)
        .then(res => {
          res.set({ taskId: res.id }, { merge: true });
          resolve(res);
        })
        .catch(e => reject(e));
    });
  }
}
