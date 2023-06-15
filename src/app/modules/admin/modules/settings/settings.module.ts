import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages';
import { GeneralComponent, OtherComponent } from './components';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    SettingsComponent,
    GeneralComponent,
    OtherComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    AgGridModule
  ]
})
export class SettingsModule { }
