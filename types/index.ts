export interface IAnswer {
  id: number;
  value: string;
}

export interface IQuestion {
  id: number;
  value: string;
  category: "signs" | "laws";
  picture: string;
  correctAnswer: IAnswer;
  answers: IAnswer[];
  order?: number;
}

export interface Solution {
  questionId?: number | string;
  userAnswerId?: number | string;
  correctAnswerId: number | string;
  isCorrect: boolean;
}

export interface Summary {
  solutions: {
    [questionId: string]: Solution;
  };
  passed: boolean;
}

export interface IUserAnswer {
  questionId: number | string;
  userAnswerId?: number | string;
}

export type AnswerMap = {
  [questionId: string]: { userAnswerId?: number | string };
};
