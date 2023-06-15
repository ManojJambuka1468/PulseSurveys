import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QuestionsService } from 'src/app/core/services/questions.service';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { questionResponse } from 'src/app/shared/interfaces/question';
import { survey } from 'src/app/shared/interfaces/survey';
import { ViewQuestionDetailsComponent } from '..';
@Component({
  selector: 'app-view-survey-details',
  templateUrl: './view-survey-details.component.html'
})
export class ViewSurveyDetailsComponent implements OnInit {
  surveyId!: string;
  survey!: survey;
  questions!: questionResponse[];
  constructor(private activatedRoute: ActivatedRoute, private surveyDataService: SurveysDataService, private modalRef: BsModalRef, private modalService: BsModalService, private questionService: QuestionsService) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.surveyId = params.get('id')!;
      this.surveyDataService.getViewSurveyDetails(this.surveyId).subscribe((data) => {
        this.survey = data;
        // this.survey.completionPercentage=Math.round(this.survey.completionPercentage!);
      });
      this.questionService.getSurveyResponses(this.surveyId).subscribe((data) => {
        this.questions = data;
      });
    })
  }
  seeMoreDetails(question: questionResponse) {
    this.modalRef = this.modalService.show(ViewQuestionDetailsComponent, { class: 'right-modal', initialState: { question: question, questions: this.questions, surveyId: this.surveyId } });
  }

}
