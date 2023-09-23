import {Component} from '@angular/core';
import {Form} from "@angular/forms";
import { AuthResponse, LoginForm } from '../types/types';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {
  errors: any;
  public form: LoginForm = {
    email: '',
    password: '',
  }
  
  constructor(private auth: AuthService, private router: Router) {
    
  }
  
  submitForm() {
    this.auth.login(this.form).subscribe(
      (data: AuthResponse) => {
        this.auth.setToken(data.access_token)
        this.auth.changeAuthStatus(true);
        this.router.navigate(['todos']);
      },
      error => this.handleError(error)
      );
  }

  handleError(error: any) {
    if (error.status === 401) {
      this.errors = {general: 'No user found.'};
    } else {
      this.errors = error.error.errors;
    }
  }
}
