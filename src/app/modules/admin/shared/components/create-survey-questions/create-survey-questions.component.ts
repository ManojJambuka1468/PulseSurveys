import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { question } from 'src/app/shared/interfaces/question';
import { newSurvey } from 'src/app/shared/interfaces/survey';
@Component({
  selector: 'app-create-survey-questions',
  templateUrl: './create-survey-questions.component.html',
  providers: []
})
export class CreateSurveyQuestionsComponent implements OnInit {
  questionsForm!: FormGroup;
  constructor(private fb: FormBuilder, private surveysDataService: SurveysDataService) { }
  isSubmitted: boolean = false;
  @Input() survey!: newSurvey;

  ngOnInit(): void {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });
    if (this.survey != undefined) {
      this.intializeForm();
    }
  }

  intializeForm() {
    for (let i = 0; i < this.survey.questions.length; i++) {
      this.questions().push(this.newQuestion(this.survey.questions[i]));
      if (this.survey.questions[i].type == 2) {
        const newArray = this.fb.array([]);
        let formGroup = this.questions().controls[i] as FormGroup;
        formGroup.addControl('options', newArray);
        for (let j = 0; j < this.survey.questions[i].options!.length; j++) {
          this.selectOptions(i).push(this.newOption(this.survey.questions[i].options![j].text))
        }
      }
    }
  }

  questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  newQuestion(question?: question): FormGroup {
    return this.fb.group({
      text: [`${question?.text ?? ''}`, Validators.required],
      AddDescription: false,
      description: `${question?.description ?? ''}`,
      type: `${question?.type ?? '0'}`,
      isCommentRequired: [question?.isCommentRequired ?? false,],
    });
  }

  addQuestion() {
    this.questions().push(this.newQuestion());
  }

  removeQuestion(questionId: number) {
    this.questions().removeAt(questionId);
  }

  selectOptions(questionId: number): FormArray {
    return this.questions()
      .at(questionId)
      .get('options') as FormArray;
  }

  newOption(option?: string): FormGroup {
    return this.fb.group({
      text: [`${option ?? ''}`, Validators.required]
    });
  }

  addSelectOption(questionId: number) {
    if (this.selectOptions(questionId).length < 5) {
      this.selectOptions(questionId).push(this.newOption());
    }
  }

  removeSelectOption(questionId: number, optionIndex: number) {
    this.selectOptions(questionId).removeAt(optionIndex);
  }

  toggleDescription(questionId: number) {
    this.questionsForm.value.questions[questionId].AddDescription = true;
  }

  validateForm() {
    this.isSubmitted = true;
    this.questionsForm.markAllAsTouched();
    console.log(this.questionsForm.valid);
    // return false;
    return this.questionsForm.valid && this.questions().length;
  }

  addSelectOptions(type: number, id: number) {
    let formGroup = this.questions().controls[id] as FormGroup;
    if (type == 2 && !this.questions().controls[id].get('options')) {
      console.log('options are there1');

      const newArray = this.fb.array([], this.atLeastOne);
      formGroup.addControl('options', newArray);
      this.addSelectOption(id);
      this.addSelectOption(id);
    }
    else {
      formGroup.removeControl('options');
    }
  }

  atLeastOne = function (control: AbstractControl): { [key: string]: any } | null {
    const formArray = control as FormArray;
    if (formArray.length <= 1) {
      return { atLeastOne: true };
    }
    return null;
  }
}