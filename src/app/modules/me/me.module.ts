import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './pages';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MeModule { }
