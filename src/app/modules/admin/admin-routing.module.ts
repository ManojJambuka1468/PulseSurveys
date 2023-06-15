import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'surveys', loadChildren: () => import('./modules/surveys/surveys.module').then(m => m.SurveysModule) },
      { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
      { path: '', redirectTo: 'surveys', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
