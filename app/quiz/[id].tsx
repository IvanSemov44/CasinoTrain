import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuiz } from '@/context/QuizContext';
import { quizzes } from '@/constants/data';
import { useTimer } from '@/hooks/useTimer';
import QuestionCard from '@/components/quiz/QuestionCard';
import Timer from '@/components/quiz/Timer';
import QuizProgress from '@/components/quiz/QuizProgress';

const QuizScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { state, submitAnswer, nextQuestion, startQuiz } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const quiz = quizzes.find(q => q.id === id);

  const { time, isRunning, start, pause } = useTimer({
    initialTime: quiz?.timeLimit || 300,
    onTimeUp: handleTimeUp,
    autoStart: false
  });

  useEffect(() => {
    if (quiz && !state.currentQuiz) {
      startQuiz(quiz);
      setStartTime(Date.now());
      start();
    }
  }, [quiz])

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Quiz not found</Text>
      </View>
    )
  }

  if (!state.currentQuiz || state.currentQuestionIndex >= quiz.questions.length) {
    return null;
  }

  const currentQuestion = quiz.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === quiz.questions.length - 1;

  function handleTimeUp() {
    Alert.alert(
      'Time\'s up!',
      'You ran out of time for this quiz.',
      [
        {
          text: 'See Results',
          onPress: () => finishQuiz(),
        }
      ]
    )
  }

  function handleAnswer(option: string) {
    setSelectedOption(option);
    submitAnswer(option);
  }

  function handleNext() {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setSelectedOption(null);
      nextQuestion();
    }
  }

  function finishQuiz() {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    pause();

    router.push({
      pathname: '/quiz/results',
      params: {
        score: state.score,
        totalQuestions: quiz?.questions.length,
        timeSpent: timeSpent,
        quizId: quiz?.id
      }
    })
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Timer time={time} isRunning={isRunning} />
        <QuizProgress
          currentQuestion={state.currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          score={state.score}
        />
      </View>

      <QuestionCard
        question={currentQuestion}
        questionNumber={state.currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        onAnswer={handleAnswer}
        selectedOption={selectedOption}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!selectedOption || time === 0) && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedOption || time === 0}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8
  },
  timer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3534'
  },
  progress: {
    fontSize: 16,
    color: '#666'
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 8
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  nextButtonDisabled: {
    backgroundColor: '6c757d'
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#dc3545'
  }
})