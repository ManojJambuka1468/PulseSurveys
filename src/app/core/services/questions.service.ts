import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { questionResponse } from 'src/app/shared/interfaces/question';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) { }
  questionsBaseUrl = 'https://app-pulsesurvey-eastus-dev-001.azurewebsites.net';


  getSurveyResponses(surveyId:string){
    return this.http.get<questionResponse[]>(`${this.questionsBaseUrl}/api/surveys/${surveyId}/responses`);
  }
  getQuestionResponses(surveyId:string, questionId:string){
    const questionResponsesUrl ='https://localhost:7000'
    return this.http.get<questionResponse>(`${this.questionsBaseUrl}/api/surveys/${surveyId}/responses/${questionId}`);
  }
}
