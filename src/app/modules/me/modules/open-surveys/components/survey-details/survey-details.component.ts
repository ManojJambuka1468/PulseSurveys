import { Component, Input, OnInit } from '@angular/core';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { survey } from 'src/app/shared/interfaces/survey';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html'
})
export class SurveyDetailsComponent implements OnInit {

  constructor(private surveysService:SurveysDataService) { }

  survey!:survey;
  @Input()surveyId!:string;

  ngOnInit(): void {
    this.surveysService.getSurveyDetailById(this.surveyId).subscribe((data)=>{this.survey=data});
  }

}
