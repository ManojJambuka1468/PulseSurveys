import { surveyType } from "../enums/survey-type";
import { question} from "./question";
export interface template {
    id?:string
    userid?:string;
    title:string,
    description:string,
    addedBy?:string,
    addedOn?:Date,
    type?:surveyType,
    isdeleted?:boolean;
    createdBy?:string
    createdOn?:Date,
    modifiedBy?:string,
    modifiedOn?:Date,
    completionPercentage?:number,
    questions:question[];
}