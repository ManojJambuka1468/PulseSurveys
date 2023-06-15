import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenSurveysComponent } from './pages';
// import { OpenSurveysComponent } from '.';

const routes: Routes = [{ path: '', component: OpenSurveysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenSurveysRoutingModule { }
