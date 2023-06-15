import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { user } from 'src/app/shared/interfaces/user';
import { response } from 'src/app/shared/interfaces/response';
import { survey } from 'src/app/shared/interfaces/survey';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  currentUser!:user;
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getUserbyId().subscribe((userDetails)=>{this.currentUser=userDetails});
  }
  surveys: BehaviorSubject<survey[]> = new BehaviorSubject<survey[]>([]);
  completedSurveys: BehaviorSubject<survey[]> = new BehaviorSubject<survey[]>([]);
  // private baseUrl = 'https://localhost:7000';
  private baseUrl = 'https://app-pulsesurvey-eastus-dev-001.azurewebsites.net';

  fetchOpenSurveys() {
    return this.http.get<survey[]>(`${this.baseUrl}/api/me/surveys/open`);
  }
  updateSubject(data: survey[]) {
    this.surveys.next(data);
  }
  getOpenSurveys() {
    return this.surveys;
  }

  fetchCompletedSurveys() {
    return this.http.get<survey[]>(`${this.baseUrl}/api/me/surveys/completed`);
  }

  updateCompletedSubject(data: survey[]) {
    this.completedSurveys.next(data);
  }
  getCompletedSurveys() {
    return this.completedSurveys;
  }
  submitSurvey(surveyResponse: response[]) {
    return this.http.post<response[]>(`${this.baseUrl}/api/surveys/responses`, surveyResponse);
  }

  getUserbyId() {
    return this.http.get<user>(`${this.baseUrl}/api/user/${this.authService.getClaims().sub}`);
  }
}
