import { surveyStatus } from "../enums/survey-status";
import { surveyType } from "../enums/survey-type";
import { question } from "./question";
export interface survey{
    id:string,
    title:string,
    description:string,
    expiresOn?:Date,
    launchedOn:Date,
    launchedBy?:string,
    closedOn?:Date,
    closedBy?:string,
    completedOn?:Date,
    completionPercentage?:number
    status?:surveyStatus,
    type?:surveyType,
    questionsCount?:number
    questions?:question[]
}
export interface newSurvey{
    userid?:string;
    id?:string,
    title:string,
    AddDescription?:boolean,
    description:string,
    expiresOn?:Date,
    canAddTemplate?:boolean;
    launchSurvey?:boolean;
    questions:question[]
}