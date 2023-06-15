import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StepperWizardComponent } from 'src/app';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { TemplatesDataService } from 'src/app/core/services/templates-data.service';
import { TemplateBasic } from 'src/app/shared/interfaces/templateBasic';
@Component({
  selector: 'app-launch-survey-select',
  templateUrl: './launch-survey-select.component.html'
})
export class LaunchSurveySelectComponent implements OnInit, OnDestroy {
  constructor(public modalRef: BsModalRef, private modalService: BsModalService, private surveyService: SurveysDataService , private templateService:TemplatesDataService) { }
  selectedTemplate!: string;
  isSubmitted:boolean=false;
  templates:TemplateBasic[]=[];
  ngOnInit(): void {
    this.templateService.getTemplateLookUp().subscribe(
      data=>{
        this.templates=data
        console.log(this.templates,'launch select');
        this.templates.unshift({ id:"-1", title: "Create a new Template and Launch" });
      }
    );
  }
  launch() {
    this.isSubmitted=true;
    if(this.selectedTemplate!=undefined){
      this.modalService.show(StepperWizardComponent, { class: 'full-modal', initialState: { modaltitle: 'Launch Survey', modalButton: 'Launch', templateId: this.selectedTemplate } });
      this.modalRef.hide();
    }
  }
  ngOnDestroy(): void {
    this.templates.shift();
  }
}