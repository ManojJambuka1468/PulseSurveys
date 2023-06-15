import { questionType } from "../enums/question-type";
import { selectOption } from "./select-option";

export interface questionResponse{ //question ==> question Detail
    // id:string,
    // text:string,
    // type:questionType,
    // averageRating:number,
    // operationPercentage:{optionSubject:string,completionPercentage:number}[],
    // sequenceNo:number,
    // commentRatingResponses?:{response:string, userId:string,name:string}[],
    // optionResponses?:{optionSubject:string,users:string[]}[]

    surveyId:string,
    questionId:string,
    text:string,
    type:questionType,
    averageRating:number,
    optionPercentage:{id:string,text:string,percentage:number}[],
    sequence:number,
    isCommentRequired:boolean,
    commentResponse?: {comment:string,userId:string,name:string}[],
    commentRatingResponse?:{comment:string, userId:string,name:string,rating:number}[],
    optionResponse?:{id:string,text:string,users:user[]}[]
}
export interface user{
    id:string,
    name:string
}

export interface question{
    id:number,
    userId?:string;
    text:string,
    description?:string,
    type:questionType,
    isCommentRequired:boolean,
    sequence:number,
    options?:selectOption[]
}