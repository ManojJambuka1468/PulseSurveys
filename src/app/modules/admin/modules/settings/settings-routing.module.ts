import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent, OtherComponent } from './components';
import { SettingsComponent } from './pages';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'general', component: GeneralComponent },
      { path: 'other', component: OtherComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
