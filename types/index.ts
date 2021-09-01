export interface IQuestion {
  id: number;
  value: string;
  image: {
    url: string;
  };
  category: 'ROAD_SINGS' | 'LAWS';
  correct: {
    id: number;
    value: string;
  };
  answers: {
    id: number;
    value: string;
  }[];
}

export type Exam = IQuestion[];

export interface Solution {
  questionId: number;
  userAnswerId: number;
  correctAnswerId: number;
  isCorrect: boolean;
}

export interface Summary {
  solutions: Solution[];
  passed: boolean;
}

export interface IAnswer {
  questionId: number;
  userAnswerId: number;
}
