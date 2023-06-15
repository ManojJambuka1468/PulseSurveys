import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionsService } from 'src/app/core/services/questions.service';
import { SurveysDataService } from 'src/app/core/services/surveys-data.service';
import { questionResponse } from 'src/app/shared/interfaces/question';
@Component({
  selector: 'app-view-question-details',
  templateUrl: './view-question-details.component.html'
})
export class ViewQuestionDetailsComponent implements OnInit {
  question!: questionResponse;
  userResponse!:questionResponse;
  surveyId!: string;
  questions!: questionResponse[];
  toggleView: number = 1;
  searchText!:string;
  gridApi!:GridApi;
  currentSequenceNumber?: number;

  constructor(public modalRef: BsModalRef, private surveysService: SurveysDataService, private questionService: QuestionsService) { }
  ngOnInit(): void {
    this.currentSequenceNumber = this.question.sequence;
  }
  gridOptions: GridOptions = {
    columnDefs: [],
    rowData: [],
    headerHeight: 35,
    rowHeight: 55,
  }
  gridReady(params: any) {
    this.gridOptions.api?.sizeColumnsToFit();
    this.gridApi = params.api;
    this.getQuestionDetails();
  }
  getQuestionDetails() {
    this.questionService.getQuestionResponses(this.surveyId, this.question.questionId).subscribe(
      (data) => {
        console.log(data);
        this.userResponse = data;
        this.setColDefs();
      }
    );
  }

  setColDefs() {
    this.gridOptions.api?.setColumnDefs([]);
    if (this.question.type == 1 || this.question.type == 0) {
      const columnUsername =
      {
        headerName:  'username',
        field: 'name'
      }
      const comment =
      {
        headerName: this.question.type==0 ?'Comment' : 'Rating',
        field: this.question.type==0 ?'comment' : 'rating'
      }
      if(this.question.type == 0){
        this.gridOptions.api?.setColumnDefs([columnUsername, comment]);
        this.gridOptions.api?.setRowData(this.userResponse?.commentResponse!);
      }
      else{
        if(this.question.isCommentRequired){
          const optionalcomment =
            {
              headerName: 'Comment',
              field: 'comment'
            }
          this.gridOptions.api?.setColumnDefs([columnUsername, comment,optionalcomment]);
        }
        else{
          this.gridOptions.api?.setColumnDefs([columnUsername, comment]);
        }
      this.gridOptions.api?.setRowData(this.userResponse?.commentRatingResponse!);
      }
    }
    else if (this.question.type == 2) {
      this.userResponse?.optionResponse?.map(
        (option: any) => {
          this.addColumn(option.text, option.users);
        }
      )
    }
    this.gridOptions.api?.sizeColumnsToFit();
  }

  addColumn(headerName: string, columnData: any[]) {
    const newColumn = {
      headerName: headerName,
      field: headerName,
    };
    this.gridOptions.columnDefs?.push(newColumn);

    this.gridOptions.api?.setColumnDefs([...this.gridOptions.columnDefs!]);

    const rowData = this.gridOptions.rowData;
    columnData.forEach((value, index) => {
      rowData![index] = { ...rowData![index], [headerName]: value.name };

    });
    this.gridApi.setRowData(rowData!);
  }

  findIndex(question: questionResponse) {
    return this.questions.findIndex(question => (question.sequence == this.question.sequence));
  }
  viewPreviousQuestion() {
    let currentIndex = this.findIndex(this.question);
    if (currentIndex > 0) {
      currentIndex--;
      this.question = this.questions[currentIndex];
      this.currentSequenceNumber = this.question.sequence;
      this.toggleView = 1;
    }
  }
  viewNextQuestion() {
    let currentIndex = this.findIndex(this.question);
    if (currentIndex < this.questions.length - 1) {
      currentIndex++;
      this.question = this.questions[currentIndex];
      this.currentSequenceNumber = this.question.sequence;
      this.toggleView = 1;
    }
  }
  onSelect() {
    this.question = this.questions.find(question => question.sequence == this.currentSequenceNumber)!;
    this.toggleView = 1;
  }

  onSearchTextChange(){
    this.gridApi.setQuickFilter(this.searchText);
  }
}