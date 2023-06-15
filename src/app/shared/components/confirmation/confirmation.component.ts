import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { switchMap } from 'rxjs';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { TemplatesDataService } from 'src/app/core/services/templates-data.service';
import { surveyStatus } from '../../enums/survey-status';
import { survey } from '../../interfaces/survey';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  selectedSurveyId!: string;
  action!: string;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public modalRef: BsModalRef, private surveyDataService: SurveysDataService, private templateService:TemplatesDataService) { }
  ngOnInit(): void {
  }
  closeSurvey() {
    if (this.action === 'delete') {
      this.templateService.deleteTemplate(this.selectedSurveyId).subscribe(() =>
        this.templateService.fetchTemplates().subscribe((data) => { this.templateService.updateTemplatesSubject(data) })
      );
    }
    else if(this.action ==="Submit Survey"){
      this.event.emit({ isSubmit: true });
    }
    else {
      this.surveyDataService.closeSurvey(this.selectedSurveyId).subscribe(
        ()=>{
          this.surveyDataService.fetchActiveSurveys().subscribe((data)=>{
            this.surveyDataService.updateActiveSubject(data);
          });
        }
      )
    }
    this.modalRef.hide();
  }
} 