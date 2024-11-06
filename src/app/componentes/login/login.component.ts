import { Component } from '@angular/core';
import { AuthGoogleService } from '../../auth/auth-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private AuthGoogleService: AuthGoogleService, private router: Router) {

  }

  login() {
    this.AuthGoogleService.login();
  }

  ngOnInit(): void {
    if (this.AuthGoogleService.isLoggedIn()) {
      this.AuthGoogleService.getUserProfile();
    }
  }
}
