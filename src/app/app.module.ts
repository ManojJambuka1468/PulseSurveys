import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from './core/authentication/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './shared/components/login/login.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TokenInterceptorService } from './core/interceptors/token-interceptor.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelectModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthService , 
  {
   provide: HTTP_INTERCEPTORS,
   useClass: TokenInterceptorService,
   multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
