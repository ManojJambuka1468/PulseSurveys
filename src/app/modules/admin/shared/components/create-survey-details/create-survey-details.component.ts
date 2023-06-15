import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { newSurvey, survey } from 'src/app/shared/interfaces/survey';
@Component({
  selector: 'app-create-survey-details',
  templateUrl: './create-survey-details.component.html'
})
export class CreateSurveyDetailsComponent implements OnInit {
  newSurveyDetails!: FormGroup;
  surveyId!: number;
  @Input() survey!: newSurvey;
  @Input() action!:string;
  constructor() { }
  ngOnInit(): void {
    console.log(this.action);
    this.intializeForm(this.survey);
  }
  intializeForm(survey?: newSurvey) {
    this.newSurveyDetails = new FormGroup({
      title: new FormControl(`${survey?.title ?? ''}`, [Validators.required]),
      description: new FormControl(`${survey?.description ?? ''}`, [Validators.required]),
    });
    if(!(this.action=='Save & Close' || this.action=='Create Template' )){
      const expiresOn=new FormControl(`${survey?.expiresOn ?? ''}`,[Validators.required]);
      this.newSurveyDetails.addControl('expiresOn',expiresOn);
    }
  }

  validateForm(){
    this.newSurveyDetails.markAllAsTouched();
    return this.newSurveyDetails.valid;
  }
}
