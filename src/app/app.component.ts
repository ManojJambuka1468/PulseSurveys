import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './core/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [OAuthService]
})
export class AppComponent implements OnInit{
  title = 'Pulse Surveys';
  isLoggedIn!:boolean;
  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.isLoggedIn=this.authService.isAuthenticated();
  }

}
