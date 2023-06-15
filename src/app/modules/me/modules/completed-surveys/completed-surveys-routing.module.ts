import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedSurveysComponent } from './pages';
const routes: Routes = [{ path: '', component: CompletedSurveysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedSurveysRoutingModule { }