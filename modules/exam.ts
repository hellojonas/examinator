import axios from 'axios';
import _ from 'lodash';
import { Exam, IAnswer, IQuestion, Solution, Summary } from '../types';

export const loadExam = async (): Promise<Exam | null> => {
  // generate random ids
  const questionsId = _.range(1, 26);
  const query = questionsId.map(id => `id_in=${id}`).join('&');
  const url = `http://10.0.2.2:1337/questions?${query}`;

  let questions: Exam;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to load exam');
    }

    const data = await res.json();

    questions = data as Exam;
  } catch (err) {
    console.error(err);
    return null;
  }

  return questions;
};

export const solveOne = (questions: IQuestion[], answer: IAnswer): Solution => {
  const question = questions.find(q => q.id === answer.questionId);

  if (!question) {
    throw Error(
      `Question with id '${answer.questionId}' not found in collection provided`
    );
  }

  return {
    questionId: question.id,
    correctAnswerId: question.correct.id,
    isCorrect: question.correct.id == answer.userAnswerId,
    userAnswerId: answer.userAnswerId,
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
