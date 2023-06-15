import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './pages';
import { ActiveComponent, ClosedComponent, LaunchSurveySelectComponent, ViewQuestionDetailsComponent, ViewSurveyDetailsComponent } from './components';

@NgModule({
  declarations: [
    SurveysComponent,
    ActiveComponent,
    LaunchSurveySelectComponent,
    ClosedComponent,
    ViewSurveyDetailsComponent,
    ViewQuestionDetailsComponent,
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    AgGridModule,
    NgSelectModule,
    ProgressbarModule.forRoot(),
    FormsModule,
    BsDropdownModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class SurveysModule { }
