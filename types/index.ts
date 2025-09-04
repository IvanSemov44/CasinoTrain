
//Question and quiz Types
export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation?: string;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    questions: Question[];
    timeLimit?: number; //in seconds
}

export interface QuizResult {
    quizId: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    timeSpent: number;
    date: Date;
}

// User Types
export interface User {
    id: string;
    username: string;
    email: string;
    scores: QuizResult[];
    preferences?: UserPreferences;
}

export interface UserPreferences {
    notifications: boolean;
    soundEffects: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
    categories: string[];
}

// Context Types
export interface QuizState {
    currentQuiz: Quiz | null;
    currentQuestionIndex: number;
    score: number;
    selectedOptions: string[];
    timeRemaining: number;
    quizResults: QuizResult[];
}

export type QuizActions =
    | { type: 'SET_QUESTIONS'; payload: Quiz }
    | { type: 'SET_CURRENT_QUESTION'; payload: number }
    | { type: 'SET_SCORE'; payload: number }
    | { type: 'SET_SELECTED_OPTION'; payload: { index: number; option: string } }
    | { type: 'SET_TIME_REMAINING'; payload: number }
    | { type: 'ADD_QUIZ_RESULT'; payload: QuizResult }
    | { type: 'RESET_QUIZ' };

// Navigation Types
export type RootStackParamList = {
    Home: undefined;
    Quiz: { quizId: string }
    Results: {
        score: number;
        totalQuestions: number;
        timeSpent: number;
        quizId: string
    };
    Profile: undefined;
    Leaderboard: undefined
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface Category {
    id: number;
    name: string;
}