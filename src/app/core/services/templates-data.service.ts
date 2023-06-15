import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { question } from 'src/app/shared/interfaces/question';
import { template } from 'src/app/shared/interfaces/template';
import { TemplateBasic } from 'src/app/shared/interfaces/templateBasic';
@Injectable({
  providedIn: 'root'
})
export class TemplatesDataService {
  private templatesBaseUrl = 'https://app-pulsesurvey-eastus-dev-001.azurewebsites.net';
  // private templatesBaseUrl = 'https://localhost:7000';


  constructor(private http: HttpClient) { }
  templates: BehaviorSubject<template[]> = new BehaviorSubject<template[]>([]);

  fetchTemplates() {
    return this.http.get<template[]>(`${this.templatesBaseUrl}/api/templates`);
  }
  updateTemplatesSubject(data: template[]) {
    this.templates.next(data);
  }
  getTemplates() {
    return this.templates;
  }
  getTemplateLookUp() {
    return this.http.get<TemplateBasic[]>(`${this.templatesBaseUrl}/api/templates/lookup`);
  }

  getTemplateDetailsById(id: string) {
    return this.http.get<template>(`${this.templatesBaseUrl}/api/templates/${id}`);
  }

  getTemplateQuestions(id: string) {
    return this.http.get<question[]>(`${this.templatesBaseUrl}/api/templates/${id}/questions`);
  }
  updateTemplate(id: string, updatedTemplate: template) {
    return this.http.put<template>(`${this.templatesBaseUrl}/api/templates/${id}`, updatedTemplate);
  }
  deleteTemplate(templateId: string) {
    return this.http.delete(`${this.templatesBaseUrl}/api/templates/${templateId}`);
  }
}
