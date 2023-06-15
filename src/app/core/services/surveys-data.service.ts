import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { newSurvey, survey } from 'src/app/shared/interfaces/survey';
import { question } from 'src/app/shared/interfaces/question';
@Injectable({
  providedIn: 'root'
})
export class SurveysDataService {
  constructor(private http: HttpClient) { }
  activeSurveys: BehaviorSubject<survey[]> = new BehaviorSubject<survey[]>([]);
  closedSurveys: BehaviorSubject<survey[]> = new BehaviorSubject<survey[]>([]);
  surveysBaseUrl = 'https://app-pulsesurvey-eastus-dev-001.azurewebsites.net';
  // surveysBaseUrl = 'https://localhost:7000';

  fetchActiveSurveys() {
    return this.http.get<survey[]>(`${this.surveysBaseUrl}/api/admin/surveys/active`);
  }
  updateActiveSubject(data: survey[]) {
    this.activeSurveys.next(data);
  }
  getActiveSurveys() {
    return this.activeSurveys;
  }

  fetchClosedSurveys() {
    return this.http.get<survey[]>(`${this.surveysBaseUrl}/api/admin/surveys/closed`);
  }
  updateClosedSubject(data: survey[]) {
    this.closedSurveys.next(data);
  }
  getClosedSurveys() {
    return this.closedSurveys;
  }

  getSurveyDetailById(surveyId: string) {
    return this.http.get<survey>(`${this.surveysBaseUrl}/api/me/surveys/${surveyId}`);
  }

  getViewSurveyDetails(surveyId: string) {
    return this.http.get<survey>(`${this.surveysBaseUrl}/api/admin/surveys/${surveyId}`);
  }

  updateSurveyDetails(surveyId: string, surveyDetails: survey) {
    return this.http.put<survey>(`${this.surveysBaseUrl}/api/admin/surveys/${surveyId}`, surveyDetails);
  }

  relaunchSurvey(surveyId: string, surveyDetails: survey) {
    return this.http.post<survey>(`${this.surveysBaseUrl}/api/admin/surveys/${surveyId}/relaunch`, surveyDetails);
  }

  getSurveyQuestions(surveyId: string) {
    return this.http.get<question[]>(`${this.surveysBaseUrl}/api/me/surveys/${surveyId}/questions`);
  }

  AddNewSurvey(newSurvey: newSurvey) {
    return this.http.post<newSurvey>(`${this.surveysBaseUrl}/api/templates`, newSurvey);
  }

  closeSurvey(surveyId: string) {
    return this.http.patch(`${this.surveysBaseUrl}/api/admin/surveys/${surveyId}/close`, null);
  }
}
