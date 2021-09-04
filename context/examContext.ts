import { createContext } from 'react';
import { AnswerMap, IAnswer } from '../types';

export type ItemCallBack = (item: { id: number; text: string }) => void;

export interface IExamContext {
  answers?: AnswerMap;
  addAnswer?: (answer: IAnswer) => void;
}

export const examContext = createContext<IExamContext>({
  answers: undefined,
  addAnswer: (_: IAnswer) => {},
});
