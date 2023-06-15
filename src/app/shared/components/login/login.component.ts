import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/core/authentication/auth.config';
import { AuthService } from 'src/app/core/authentication/auth.service';
// import { login } from 'src/app/shared/model/login';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
 invalid: boolean = false;
 constructor(private oauthService:OAuthService){
  this.configureSingleSignOn();
}

configureSingleSignOn(){
  this.oauthService.configure(authConfig);
  this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  this.oauthService.loadDiscoveryDocumentAndTryLogin();
}

login(){
  this.oauthService.initCodeFlow();
}

logout(){
  this.oauthService.logOut();
}

token(){
  let claims:any = this.oauthService.getIdentityClaims();
  return claims ? claims : null;
}

}