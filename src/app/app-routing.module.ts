import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { TodoComponent } from "./todos/todo-list/todo.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LogoutComponent } from './auth/logout/logout.component';
import { GuestService } from './auth/services/guest.service';
import { LoggedInGuard } from './auth/services/logged-in.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestService]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuestService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestService]
  },
  {
    path: 'todos',
    component: TodoComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
