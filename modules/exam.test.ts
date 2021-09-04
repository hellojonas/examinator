import { loadExam, solve, solveOne } from './exam';
import { answers, solution as _solution } from '../data/data';
import { IQuestion, Summary } from '../types';

let questions: IQuestion[] | null;

beforeAll(async () => {
  questions = await loadExam();
  // console.log(questions);
});

test('exam has 25 questions', async () => {
  // const questions = await loadExam();
  expect(questions?.length).toBe(25);
});

const solution1 = {
  questionId: '3',
  correctAnswerId: '1482',
  userAnswerId: '434',
  isCorrect: false,
};

test('solving one questions', () => {
  const question1 = questions?.find(q => q.id === 3);
  const question2 = questions?.find(q => q.id === 10);

  const _solution1 = solveOne(questions!, {
    questionId: 3,
    userAnswerId: 434,
  });

  const _solution2 = solveOne(questions!, {
    questionId: 10,
    userAnswerId: 434,
  });

  expect(_solution1).toEqual(solution1);
  expect(_solution2.isCorrect).toBeFalsy();
});

// let solution: Solution;
let summary: Summary;

test('exam has 25 answers', () => {
  summary = solve(questions!, answers);
  expect(summary.solutions.length).toBe(25);
});

test('solution fails', () => {
  // expect(summary.solutions).toEqual(_solution);
  expect(summary.passed).toBeFalsy();
});
