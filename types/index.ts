export interface IQuestion {
  id: number | string;
  value: string;
  image: {
    url: string;
  };
  category: 'ROAD_SINGS' | 'LAWS';
  correct: {
    id: number | string;
    value: string;
  };
  answers: {
    id: number | string;
    value: string;
  }[];
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

export interface IAnswer {
  questionId: number | string;
  userAnswerId?: number | string;
}

export type AnswerMap = {
  [questionId: string]: { userAnswerId?: number | string };
};
