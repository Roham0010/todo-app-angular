import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private auth: AuthService) {
    this.isLoggedIn = false;
    
  }

  ngOnInit() {
    console.log(this.isLoggedIn, 'first');
    this.auth.loggingStatus.subscribe(value => this.isLoggedIn = value);
    console.log(this.isLoggedIn, 'second');
  }


}
