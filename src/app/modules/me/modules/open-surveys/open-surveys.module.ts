import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RatingModule } from 'ngx-bootstrap/rating';
import { NgSelectModule } from '@ng-select/ng-select';

import { OpenSurveysRoutingModule } from './open-surveys-routing.module';
import { OpenSurveysComponent } from './pages';
import { SurveyDetailsComponent, SurveyQuestionsComponent } from './components';
import { ActionsGridChildComponent } from './components/actions-grid-child/actions-grid-child.component';
import { TakeSurveyStepperWizardComponent } from './components/take-survey-stepper-wizard/take-survey-stepper-wizard.component';

@NgModule({
  declarations: [
    OpenSurveysComponent,
    SurveyDetailsComponent,
    SurveyQuestionsComponent,
    ActionsGridChildComponent,
    TakeSurveyStepperWizardComponent
  ],
  imports: [
    CommonModule,
    OpenSurveysRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    NgSelectModule
  ]
})
export class OpenSurveysModule { }
