// constants/data.ts
import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'General Knowledge',
    description: 'Test your knowledge on various topics',
    category: 'General',
    difficulty: 'easy',
    timeLimit: 300, // 5 minutes
    questions: [
      {
        id: '1-1',
        question: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        category: 'Geography',
        difficulty: 'easy',
      },
      {
        id: '1-2',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        category: 'Science',
        difficulty: 'easy',
      },
      {
        id: '1-3',
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
        category: 'Literature',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: '2',
    title: 'Science Quiz',
    description: 'Challenge your science knowledge',
    category: 'Science',
    difficulty: 'medium',
    timeLimit: 240, // 4 minutes
    questions: [
      {
        id: '2-1',
        question: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctAnswer: 'Au',
        category: 'Science',
        difficulty: 'medium',
      },
      {
        id: '2-2',
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 'Carbon Dioxide',
        category: 'Science',
        difficulty: 'medium',
      },
    ],
  },
  {
    id: '3',
    title: 'History Challenge',
    description: 'Test your knowledge of historical events',
    category: 'History',
    difficulty: 'hard',
    timeLimit: 360, // 6 minutes
    questions: [
      {
        id: '3-1',
        question: 'In which year did World War II end?',
        options: ['1943', '1945', '1947', '1950'],
        correctAnswer: '1945',
        category: 'History',
        difficulty: 'hard',
      },
    ],
  },
];