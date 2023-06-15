import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CompletedSurveysRoutingModule } from './completed-surveys-routing.module';
import { CompletedSurveysComponent } from './pages';
@NgModule({
  declarations: [
    CompletedSurveysComponent
  ],
  imports: [
    CommonModule,
    CompletedSurveysRoutingModule,
    AgGridModule,
    FormsModule,
    BsDropdownModule,
    BsDatepickerModule.forRoot()
  ]
})
export class CompletedSurveysModule { }
