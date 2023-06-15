import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeComponent } from './pages';
const routes: Routes = [
  {
    path: '', component: MeComponent, children: [
      { path: 'open-surveys', loadChildren: () => import('./modules/open-surveys/open-surveys.module').then(m => m.OpenSurveysModule) },
      { path: 'completed-surveys', loadChildren: () => import('./modules/completed-surveys/completed-surveys.module').then(m => m.CompletedSurveysModule) },
      { path: '', redirectTo: 'open-surveys', pathMatch: 'full'}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
