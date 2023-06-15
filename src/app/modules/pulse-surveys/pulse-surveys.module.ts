import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PulseSurveysRoutingModule } from './pulse-surveys-routing.module';
import { PulseSurveysComponent } from './pages/pulse-surveys.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/interceptors/token-interceptor.service';
@NgModule({
  declarations: [
    PulseSurveysComponent
  ],
  imports: [
    CommonModule,
    PulseSurveysRoutingModule,
    LayoutModule
  ],
  providers:[
    // {
    // provide: HTTP_INTERCEPTORS,
    // useClass: TokenInterceptorService,
    // multi: true,
    // }
  ]
})
export class PulseSurveysModule { }
