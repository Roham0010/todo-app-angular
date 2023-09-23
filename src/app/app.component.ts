import {Component} from '@angular/core';
import {AuthService} from "./auth/services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todos-angular';
  protected readonly AuthService = AuthService;
}
