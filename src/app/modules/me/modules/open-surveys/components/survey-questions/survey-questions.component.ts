import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionsService } from 'src/app/core/services/questions.service';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { question } from 'src/app/shared/interfaces/question';
import { response } from 'src/app/shared/interfaces/response';
@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html'
})
export class SurveyQuestionsComponent implements OnInit {
  questions!: question[];
  responses: response[] = [];
  questionsForm!: FormGroup;
  @Input() surveyId!: string;

  constructor(private userService: UserService, private surveyService: SurveysDataService, private fb: FormBuilder, private modalRef: BsModalRef) { }
  ngOnInit(): void {
    this.surveyService.getSurveyQuestions(this.surveyId).subscribe(
      (data) => {
        this.questions = data;
        this.questionsForm = this.toFormGroup(this.questions);
      }
    );
  }
  toFormGroup(questions: question[]) {
    const group: any = {};
    questions.forEach(question => {
      group[question.text] = new FormControl(null, Validators.required);
      if (question.isCommentRequired) {
        group[question.text + 'comment'] = new FormControl("");
      }
    });
    return new FormGroup(group);
  }
  validateForm() {
    this.questionsForm.markAllAsTouched();
    return this.questionsForm.valid;
  }
  submit() {
    this.questions.forEach(element => {
      let newRespnse: response = { surveyId:this.surveyId,questionId: element.id!, questionType: element.type, isCommentRequired: element.isCommentRequired }
      if (element.type == 1) {
        newRespnse.rating = this.questionsForm.value[element.text];
      }
      else if (element.type == 0) {
        newRespnse.comment = this.questionsForm.value[element.text];
      }
      else {
        newRespnse.selectedAnswer = [this.questionsForm.value[element.text]];
      }
      if (element.isCommentRequired) {
        newRespnse.comment = this.questionsForm.value[element.text + 'comment'];
      }
      this.responses.push(newRespnse);
    });
    this.userService.submitSurvey(this.responses).subscribe(()=>{
      this.userService.fetchOpenSurveys().subscribe((data) => {
        this.userService.updateSubject(data);
      });
    });
    this.modalRef.hide()
  }

}
