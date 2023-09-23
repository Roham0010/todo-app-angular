import {Component} from '@angular/core';
import { AuthResponse, RegisterForm } from '../types/types';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent {
  public errors: any;
  public form: RegisterForm = {
    email: '',
    name: '',
    password: '',
    password_confirmation: ''
  }
  
  constructor(private auth: AuthService, private router: Router) {
    
  }
  
  submitForm() {
    this.auth.register(this.form).subscribe(
      (data: AuthResponse) => {
        this.auth.setToken(data.access_token)
        this.router.navigate(['todos']);
        this.auth.changeAuthStatus(true);
      },
      error => this.handleError(error)
      );
  }

  handleError(error: any) {
    this.errors = error.error.errors;
  }
}
