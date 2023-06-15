import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent, LeftNavComponent } from '.';
import { RouterModule} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    LeftNavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
  ],
  exports:[
    LeftNavComponent,HeaderComponent
  ]
})
export class LayoutModule { }
