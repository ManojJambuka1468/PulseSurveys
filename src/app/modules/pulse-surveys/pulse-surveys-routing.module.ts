import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PulseSurveysComponent } from './pages/pulse-surveys.component';

const routes: Routes = [
  {
    path: '', component: PulseSurveysComponent, children: [
      { path: 'me', loadChildren: () => import('./../me/me.module').then(m => m.MeModule) },
      { path: 'admin', loadChildren: () => import('./../admin/admin.module').then(m => m.AdminModule) },
      { path: '', redirectTo: 'me', pathMatch: 'full' },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PulseSurveysRoutingModule { }
