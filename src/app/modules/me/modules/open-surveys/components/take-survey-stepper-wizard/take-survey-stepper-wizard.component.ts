import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from 'src/app';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { survey } from 'src/app/shared/interfaces/survey';
import { SurveyDetailsComponent, SurveyQuestionsComponent } from '..';

@Component({
  selector: 'app-take-survey-stepper-wizard',
  templateUrl: './take-survey-stepper-wizard.component.html'
})
export class TakeSurveyStepperWizardComponent {

  modaltitle!:string;
  modalButton!:string;
  currentStep:number=1;
  templateId!:string;
  @ViewChild(SurveyDetailsComponent) surveyDetails!: SurveyDetailsComponent;
  @ViewChild(SurveyQuestionsComponent) surveyQuestions!: SurveyQuestionsComponent;

  constructor(public modalRef:BsModalRef,private modalService:BsModalService,  private surveysDataService:SurveysDataService) { }
  survey!:survey;
  ngOnInit(): void {
    if(this.templateId!=undefined){
      this.surveysDataService.getSurveyDetailById(this.templateId).subscribe((data)=>{this.survey=data});
    }
  }

  steps:{Number:number,Title:string}[]=[
    {
      Number:1,
      Title:'Basic Fields'
    },
    {
      Number:2,
      Title:'Questions In Survey'
    }
  ]

  goto(stepNumber:number){
    this.currentStep=stepNumber;
  }

  gotoNext(){
    this.currentStep++;
  }
  goBack(){
    this.currentStep--;
  }
  
  launchSurvey(){
    if(this.surveyQuestions.validateForm()){
      this.modalRef = this.modalService.show(ConfirmationComponent, { class: 'modal-dialog-centered', initialState: { action: "Submit Survey"} });
      this.modalRef.content.event.subscribe((data:any) => {
        if(data.isSubmit){
          this.surveyQuestions.submit();
        }
      });
    }
  }

}
