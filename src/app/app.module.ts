import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './comp/auth/login/login.component';
import { RegisterComponent } from './comp/auth/register/register.component';
import { TasksComponent } from './comp/page/tasks/tasks.component';
import { AccountComponent } from './comp/page/account/account.component';
import { NewTaskComponent } from './comp/page/tasks/new-task/new-task.component';
import { NavComponent } from './comp/nav/nav.component';
import { BottomNavComponent } from './comp/nav/bottom-nav/bottom-nav.component';

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
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
