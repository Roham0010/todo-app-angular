import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {  
  constructor(private auth: AuthService, private router: Router) {
   this.auth.logout();
   this.auth.changeAuthStatus(false);
   this.router.navigate(['login']);
  }
}

