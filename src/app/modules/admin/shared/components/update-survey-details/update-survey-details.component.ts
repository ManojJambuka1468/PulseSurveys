import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { survey} from 'src/app/shared/interfaces/survey';
@Component({
  selector: 'app-update-survey-details',
  templateUrl: './update-survey-details.component.html',
  providers:[DatePipe]
})
export class UpdateSurveyDetailsComponent implements OnInit {
  userId!:string;
  modaltitle!:string;
  modalButton!:string;
  selectedSurvey!:survey;
  selectedSurveyId!:string;
  currentDate:Date=new Date();
  updateSurveyForm!:FormGroup;
  constructor(public modalRef: BsModalRef,private surveyDataService:SurveysDataService, private datepipe:DatePipe,private userService:UserService) { }
  ngOnInit(): void {
    // this.userId=this.userService.getUserId();
    this.surveyDataService.getSurveyDetailById(this.selectedSurveyId).subscribe(
      (data)=>{
        this.selectedSurvey=data
        this.initializeForm(this.selectedSurvey);
      }
    );
  }
  initializeForm(selectedSurvey: survey) {
    this.updateSurveyForm = new FormGroup({
      title: new FormControl(`${selectedSurvey?.title ?? ''}`, [Validators.required]),
      description: new FormControl(`${selectedSurvey?.description ?? ''}`, [Validators.required]),
      expiresOn: new FormControl(this.datepipe.transform(new Date(this.selectedSurvey.expiresOn!),'yyyy-MM-dd'), [Validators.required]),
    });
  }
  updateSurvey(){
    if(this.updateSurveyForm.valid){
      let updatedSurvey:survey=this.selectedSurvey;
      updatedSurvey.title=this.updateSurveyForm.value.title;
      updatedSurvey.description=this.updateSurveyForm.value.description;
      updatedSurvey.expiresOn=this.updateSurveyForm.value.expiresOn;

      if(this.modalButton=='Relaunch'){
        this.surveyDataService.relaunchSurvey(this.selectedSurveyId,updatedSurvey).subscribe(()=>{
          this.surveyDataService.fetchClosedSurveys().subscribe((data)=>{
            this.surveyDataService.updateClosedSubject(data);
            this.modalRef.hide();
          })
        });
      }
      else{
        this.surveyDataService.updateSurveyDetails(this.selectedSurveyId,updatedSurvey).subscribe(()=>{
          this.surveyDataService.fetchActiveSurveys().subscribe((data)=>{
            this.surveyDataService.updateActiveSubject(data);
            this.modalRef.hide();
          });
        });
      }
    }
  }
}
