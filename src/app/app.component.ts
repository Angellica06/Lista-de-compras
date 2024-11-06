import { Component } from '@angular/core';
import { AuthGoogleService } from './auth/auth-google.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lista-Compras';

  user: { name: string, email: string } | null = null;

  isCardRoute: boolean = false;

  constructor(
    private AuthGoogleService: AuthGoogleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    
    this.checkRoute();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();  
      }
    });
  }

  checkRoute() {
    this.isCardRoute = this.router.url.includes('card');
  }

  logOut() {
    this.AuthGoogleService.logout();
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    this.user = null; 
  }
}
