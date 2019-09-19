import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './comp/page/tasks/tasks.component';
import { LoginComponent } from './comp/auth/login/login.component';
import { RegisterComponent } from './comp/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AccountComponent } from './comp/page/account/account.component';
import { BlogComponent } from './comp/page/blog/blog.component';
import { NewTaskComponent } from './comp/page/tasks/new-task/new-task.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks/new-task',
    component: NewTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
