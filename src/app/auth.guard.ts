import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGoogleService } from './auth/auth-google.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthGoogleService, private router: Router) {}

  canActivate(): boolean {
    if (this.AuthService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
