import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages';
import { ActionsDropdownGridChildComponent, CreateSurveyDetailsComponent, CreateSurveyQuestionsComponent, StepperWizardComponent, UpdateSurveyDetailsComponent } from './shared/components';
@NgModule({
  declarations: [
    AdminComponent,
    ActionsDropdownGridChildComponent,
    UpdateSurveyDetailsComponent,
    StepperWizardComponent,
    CreateSurveyDetailsComponent,
    CreateSurveyQuestionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    BsDropdownModule,
    AgGridModule,
    AccordionModule.forRoot()
  ]
})
export class AdminModule { }
