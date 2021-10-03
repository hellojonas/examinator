import { createContext } from "react";
import { AnswerMap, IUserAnswer } from "../types";

export type ItemCallBack = (item: { id: number; text: string }) => void;

export interface IExamContext {
  answers?: AnswerMap;
  addAnswer?: (answer: IUserAnswer) => void;
}

export const examContext = createContext<IExamContext>({
  answers: undefined,
  addAnswer: (_: IUserAnswer) => {},
});
