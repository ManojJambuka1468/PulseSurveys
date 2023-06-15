import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './auth.config';

@Injectable()
export class AuthService {
  constructor(private oauthService: OAuthService, private router:Router) {
    console.log('AuthService');
    this.intiateLogin();
  }

  intiateLogin() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(
      (isLoggedIn) => {
        if (isLoggedIn) {
          setTimeout(() => {
            this.router.navigate(['../pulse-surveys']);
          }, 300);
          // this.oauthService.setupAutomaticSilentRefresh();
          this.oauthService.events.subscribe((event) => {
            if (event.type === 'token_refresh_error') {
              console.log('token_refresh_error');
              // this.logout(); // Initiate logout if token refresh error occurs
            }
          });
        } else {
          this.oauthService.initCodeFlow();
        }
      },
      // (error) => {
      //   if (error.status === 400) {
      //     // location.reload();
      //   }
      // }
    );
  }
  

  logout() {
    this.oauthService.logOut();
  }

  getClaims(){
    const accessToken = this.token();
    const base64Url = accessToken.split('.')[1]; // Extract the middle part of the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
    const tokenPayload = JSON.parse(atob(base64)); // Decode the Base64-encoded payload
    console.log(tokenPayload);
    return tokenPayload; 
  }
  token() {
    return this.oauthService.getAccessToken();
  }


  isAuthenticated(): boolean {
    // console.log('isAuthenicated', this.oauthService.hasValidIdToken());
    // if(this.oauthService.getAccessToken()){
    //   return true
    // }
    // return false;
    return this.oauthService.hasValidAccessToken();
  }
}
