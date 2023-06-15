import { questionType } from "../enums/question-type";
import { selectOption } from "./select-option";

export interface response {
    surveyId?:string,
    questionId:number,// string
    userId?:string
    questionType:questionType,
    isCommentRequired:boolean,
    comment?:string,
    selectedAnswer?:string[],
    rating?:number,
}