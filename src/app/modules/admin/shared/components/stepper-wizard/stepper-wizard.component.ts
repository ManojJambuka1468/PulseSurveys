import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { TemplatesDataService } from 'src/app/core/services/templates-data.service';
import { newSurvey } from 'src/app/shared/interfaces/survey';
import { template } from 'src/app/shared/interfaces/template';
import { CreateSurveyDetailsComponent, CreateSurveyQuestionsComponent } from '..';
import { v4 as uuidv4 } from 'uuid';
import { question } from 'src/app/shared/interfaces/question';
import { AuthService } from 'src/app/core/authentication/auth.service';
@Component({
  selector: 'app-stepper-wizard',
  templateUrl: './stepper-wizard.component.html'
})
export class StepperWizardComponent implements OnInit {
  modaltitle!: string;
  modalButton!: string;
  currentStep: number = 1;
  templateId!: string;
  template!: template;
  survey!: newSurvey;
  @ViewChild(CreateSurveyDetailsComponent) surveyDetails!: CreateSurveyDetailsComponent;
  @ViewChild(CreateSurveyQuestionsComponent) surveyQuestions!: CreateSurveyQuestionsComponent;

  constructor(public modalRef: BsModalRef, private surveysDataService: SurveysDataService, private templateService: TemplatesDataService, private authService: AuthService) { }
  ngOnInit(): void {
    if (this.templateId != undefined && this.templateId != "-1") {
      this.templateService.getTemplateDetailsById(this.templateId).subscribe(
        (data) => {
          this.template = data;
          this.survey = this.template;
          this.survey.canAddTemplate = false;
          this.survey.launchSurvey = true;
          this.templateService.getTemplateQuestions(this.templateId).subscribe(
            data => {
              console.log(data);
              this.template.questions = data;
            }
          )
          if (this.modalButton == "Launch") {
            this.survey.expiresOn = undefined;
          }
        }
      );

    }
  }

  steps: { Number: number, Title: string }[] = [
    {
      Number: 1,
      Title: 'Basic Fields'
    },
    {
      Number: 2,
      Title: 'Questions In Template'
    }
  ]

  goto(stepNumber: number) {
    this.currentStep = stepNumber;
  }

  gotoNext() {
    if (this.surveyDetails.validateForm()) {
      let details = this.surveyDetails.newSurveyDetails.value;
      if (this.survey == undefined) {
        this.survey = { title: details.title, description: details.description, expiresOn: details.expiresOn, questions: [], launchSurvey: true, canAddTemplate: true };
      }
      else {
        this.survey.title = details.title;
        this.survey.description = details.description;
        this.survey.expiresOn = details.expiresOn;
        console.log(details.expiresOn);

      }
      this.currentStep++;
      console.log(this.survey);
    }
  }
  goBack() {
    this.currentStep--;
  }

  launchSurvey() {
    if (this.surveyQuestions.validateForm()) {
      this.survey.userid = this.authService.getClaims().sub;
      if (this.templateId == undefined || this.modalButton == "Launch") {
        this.survey.questions = this.surveyQuestions.questionsForm.value.questions;
        this.survey.questions.forEach(
          (question: question, index) => {
            question.type = +(question.type);
            question.sequence = index + 1;
            if (question.options) {
              question.options.forEach(element => {
                const uuid = uuidv4();
                element.id = uuid;
              });
            }
          }
        )
        console.log(this.survey, 'Launched New Survey');
        if (this.modalButton == "Create Template") {
          this.survey.canAddTemplate = true;
          this.survey.launchSurvey = false;
        }
        this.surveysDataService.AddNewSurvey(this.survey).subscribe((data) => {
          this.modalRef.hide();
          this.surveysDataService.fetchActiveSurveys().subscribe(data => {
            this.surveysDataService.updateActiveSubject(data);
          });
        });
      }
      else {
        this.template.userid = this.survey.userid;
        this.template.title = this.survey.title;
        this.template.description = this.survey.description;
        this.template.questions = this.surveyQuestions.questionsForm.value.questions;
        this.template.questions.forEach(
          (question: question, index) => {
            question.type = +(question.type);
            question.sequence = index;
            if (question.options) {
              question.options.forEach(element => {
                if (!element.id) {
                  const uuid = uuidv4();
                  element.id = uuid;
                }
              });
            }
          }
        )
        console.log(this.template, 'Updated Template');
        this.templateService.updateTemplate(this.templateId, this.template).subscribe((data) => {
          this.templateService.fetchTemplates().subscribe(data => {
            this.templateService.updateTemplatesSubject(data);
            this.modalRef.hide();
          });
        });
      }
    }
  }
}