import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { LoginComponent } from './comp/auth/login/login.component';
import { RegisterComponent } from './comp/auth/register/register.component';
import { TasksComponent } from './comp/page/tasks/tasks.component';
import { AccountComponent } from './comp/page/account/account.component';
import { NewTaskComponent } from './comp/page/tasks/new-task/new-task.component';
import { NavComponent } from './comp/nav/nav.component';
import { BottomNavComponent } from './comp/nav/bottom-nav/bottom-nav.component';

/* AngularFire */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from '@angular/fire/firestore';
import { AuthService } from './core/services/auth.service';
import { DatabaseService } from './core/services/database.service';
import { AuthGuard } from './core/guards/auth.guard';
import { MaterialModule } from './core/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TasksComponent,
    AccountComponent,
    NewTaskComponent,
    NavComponent,
    BottomNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    MaterialModule,
    // AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, DatabaseService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
