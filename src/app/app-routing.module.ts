import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'pulse-surveys', canActivate: [AuthGuard], loadChildren: () => import('./modules/pulse-surveys/pulse-surveys.module').then(m => m.PulseSurveysModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
