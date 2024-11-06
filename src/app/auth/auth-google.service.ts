import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  constructor(private oAuthService: OAuthService, private dataService: DataService) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '45911626520-ls0009qrjkpi231givkj805ci6s2buk8.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/card',
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.isLoggedIn()) {
        this.getUserProfile(); 
      }
    });
  }

  login() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }

  isLoggedIn(): boolean {
    const loggedIn = this.oAuthService.hasValidAccessToken();
    return loggedIn;
  }

  getUserProfile() {
    if (this.isLoggedIn()) {
      const claims = this.oAuthService.getIdentityClaims();
      if (claims) {
        const user = {
          name: claims['name'],  
          email: claims['email'] 
        };

        this.saveUserToApi(user);
      }
    }
  }

  saveUserToApi(user: { name: string, email: string }) {
    this.dataService.addUser(user).subscribe(
      (response) => {
        localStorage.setItem('user', JSON.stringify(user));
  
      },
      (error) => {
        console.error('Erro ao salvar usuário', error);
      }
    );
  }
}
