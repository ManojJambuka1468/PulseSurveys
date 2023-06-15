import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveComponent, ClosedComponent, ViewSurveyDetailsComponent } from './components';
import { SurveysComponent } from './pages';

const routes: Routes = [
  {
    path: '', component: SurveysComponent, children: [
      { path: 'active', component: ActiveComponent },
      { path: 'closed', component: ClosedComponent },
      { path: 'closed/view/:id', component: ViewSurveyDetailsComponent },
      { path: '', redirectTo: 'active', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
