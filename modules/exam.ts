import axios from 'axios';
import _ from 'lodash';
import { AnswerMap, IAnswer, IQuestion, Solution, Summary } from '../types';

export const loadExam = async (): Promise<IQuestion[] | null> => {
  const questionsId = _.range(1, 26);
  const query = questionsId.map(id => `id_in=${id}`).join('&');
  const url = `http://localhost:1337/questions?${query}`;

  let questions: IQuestion[];

  try {
    const res = await axios.get(url);

    if (res.status != 200) {
      throw new Error('Failed to load exam');
    }

    questions = res.data as IQuestion[];
  } catch (err) {
    console.error(err);
    return null;
  }

  return questions;
};

export const solveOne = (questions: IQuestion[], answer: IAnswer): Solution => {
  const question = questions.find(q => q.id == answer.questionId);

  if (!question) {
    throw new Error(
      `Question with id ${answer.questionId} not found in collection provided`
    );
  }

  return {
    questionId: question.id.toString(),
    correctAnswerId: question.correct.id.toString(),
    isCorrect: question.correct.id == answer.userAnswerId,
    userAnswerId: answer.userAnswerId?.toString(),
  };
};

export const solve = (questions: IQuestion[], answers: AnswerMap): Summary => {
  let summary: Summary = { passed: false, solutions: {} };

  _.forEach(
    answers,
    (ans, qid) =>
      (summary.solutions[qid] = solveOne(questions, {
        questionId: qid,
        userAnswerId: ans.userAnswerId,
      }))
  );

  summary.passed =
    _.filter(summary.solutions, sol => sol.isCorrect).length >= 18;

  return summary;
};
