import axios from 'axios';
import _ from 'lodash';

export interface IQuestion {
  id: string;
  value: string;
  image: string;
  category: 'ROAD_SINGS' | 'LAWS';
  correct: {
    id: string;
    value: string;
  };
  answers: {
    id: string;
    value: string;
  }[];
}

export type Exam = IQuestion[];

export interface Solution {
  questionId: string;
  userAnswerId: string;
  correctAnswerId: string;
  isCorrect: boolean;
}

export interface Summary {
  solutions: Solution[];
  passed: boolean;
}

export interface IAnswer {
  questionId: string;
  userAnswerId: string;
}

export const loadExam = async (): Promise<Exam | null> => {
  // generate random ids
  const questionsId = _.range(1, 26);
  const query = questionsId.map(id => `id_in=${id}`).join('&');
  const url = `http://localhost:1337/questions?${query}`;

  console.log('hit', url);

  let questions: Exam;
  try {
    const res = await axios.get<Exam>(url);

    if (res.statusText !== 'OK') {
      throw new Error('failed to load exam');
    }

    questions = res.data;
  } catch (err) {
    console.error(err);
    return null;
  }

  return questions;
};

export const solveOne = (questions: IQuestion[], answer: IAnswer): Solution => {
  const question = questions.find(q => q.id.toString() === answer.questionId);

  if (!question) {
    throw Error(
      `Question with id '${answer.questionId}' not found in collection provided`
    );
  }

  return {
    questionId: question.id.toString(),
    correctAnswerId: question.correct.id.toString(),
    isCorrect: question.correct.id == answer.userAnswerId,
    userAnswerId: answer.userAnswerId.toString(),
  };
};

export const solve = (questions: IQuestion[], answers: IAnswer[]): Summary => {
  const solutions = answers.map(a => {
    const s = solveOne(questions, a);
    return s;
  });

  return {
    passed: solutions.filter(sol => sol.isCorrect).length >= 18,
    solutions,
  };
};
