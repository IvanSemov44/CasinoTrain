import { createContext, ReactNode, useContext, useReducer } from "react";
import { Quiz, QuizActions, QuizResult, QuizState } from "@/types";

interface QuizContextType {
    state: QuizState;
    dispatch: React.Dispatch<QuizActions>;
    startQuiz: (quiz: Quiz) => void;
    submitAnswer: (option: string) => void;
    nextQuestion: () => void;
    finishQuiz: (result: Omit<QuizResult, 'date'>) => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: QuizState = {
    currentQuiz: null,
    currentQuestionIndex: 0,
    score: 0,
    selectedOptions: [],
    timeRemaining: 0,
    quizResults: [],
}

const quizReducer = (state: QuizState, action: QuizActions): QuizState => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return {
                ...state,
                currentQuiz: action.payload,
                currentQuestionIndex: 0,
                score: 0,
                selectedOptions: [],
                timeRemaining: action.payload.timeLimit || 0
            };
        case 'SET_CURRENT_QUESTION':
            return {
                ...state,
                currentQuestionIndex: action.payload
            };
        case 'SET_SCORE':
            return {
                ...state,
                score: action.payload
            };
        case 'SET_SELECTED_OPTION':
            const newSelectedOptions = [...state.selectedOptions];
            newSelectedOptions[action.payload.index] = action.payload.option
            return {
                ...state,
                selectedOptions: newSelectedOptions
            };
        case 'SET_TIME_REMAINING':
            return {
                ...state,
                timeRemaining: action.payload
            };
        case 'ADD_QUIZ_RESULT':
            return {
                ...state,
                quizResults: [...state.quizResults, action.payload]
            }
        case 'RESET_QUIZ':
            return {
                ...state,
                currentQuiz: null,
                currentQuestionIndex: 0,
                score: 0,
                selectedOptions: [],
                timeRemaining: 0
            };
        default:
            return state;
    }
};

interface QuizProviderProps {
    children: ReactNode
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const startQuiz = (quiz: Quiz) => {
        dispatch({ type: 'SET_QUESTIONS', payload: quiz })
    };

    const submitAnswer = (option: string) => {
        const currentIndex = state.currentQuestionIndex;
        dispatch({
            type: 'SET_SELECTED_OPTION',
            payload: { index: currentIndex, option }
        })

        if (state.currentQuiz && option === state.currentQuiz.questions[currentIndex].correctAnswer) {
            dispatch({ type: 'SET_SCORE', payload: state.score + 1 })
        }
    };

    const nextQuestion = () => {
        if (state.currentQuiz && state.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
            dispatch({
                type: 'SET_CURRENT_QUESTION',
                payload: state.currentQuestionIndex + 1
            })
        }
    };

    const finishQuiz = (result: Omit<QuizResult, 'date'>) => {
        const quizResult: QuizResult = {
            ...result,
            date: new Date(),
        };

        dispatch({ type: 'ADD_QUIZ_RESULT', payload: quizResult });
        dispatch({ type: 'RESET_QUIZ' })
    }

    return (
        <QuizContext.Provider
            value={{
                state,
                dispatch,
                startQuiz,
                submitAnswer,
                nextQuestion,
                finishQuiz
            }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = (): QuizContextType => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}