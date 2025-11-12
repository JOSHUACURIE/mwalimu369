export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  teacherId: string;
  questions: QuizQuestion[];
}

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    courseId: 'c1',
    title: 'Algebra Basics',
    teacherId: 'u2',
    questions: [
      {
        id: 'qq1',
        question: 'What is the value of x if 2x + 4 = 10?',
        options: ['2', '3', '4', '6'],
        correctAnswer: '3',
      },
      {
        id: 'qq2',
        question: 'Simplify: (3x + 2x)',
        options: ['6x', '5x', 'x²', '2x'],
        correctAnswer: '5x',
      },
    ],
  },
  {
    id: 'q2',
    courseId: 'c2',
    title: 'Grammar Practice',
    teacherId: 'u3',
    questions: [
      {
        id: 'qq3',
        question: 'Choose the correct sentence:',
        options: [
          'He go to school daily.',
          'He goes to school daily.',
          'He going to school daily.',
          'He gone to school daily.',
        ],
        correctAnswer: 'He goes to school daily.',
      },
    ],
  },
];
