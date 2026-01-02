import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuiz } from '@/context/QuizContext';
import { quizzes } from '@/constants/data';
import ResultSummary from '@/components/quiz/ResultSummary';

const ResultsScreen = () => {
  const { score, totalQuestions, timeSpent, quizId } = useLocalSearchParams();
  const router = useRouter();
  const { finishQuiz } = useQuiz();

  const numericScore = Number(score);
  const numericTotalQuestions = Number(totalQuestions);
  const numericTimeSpent = Number(timeSpent);

  const quiz = quizzes.find(q => q.id === quizId);

  useEffect(() => {
    if (quizId && typeof quizId === 'string') {
      finishQuiz({
        quizId,
        score: numericScore,
        totalQuestions: numericTotalQuestions,
        correctAnswers: numericScore,
        incorrectAnswers: numericTotalQuestions - numericScore,
        timeSpent: numericTimeSpent
      })
    }
  }, [])

  const handleGoHome = () => {
    router.replace('/(tabs)')
  }

  const handleTryAgain = () => {
    if (quizId && typeof quizId === 'string') {
      router.replace({
        pathname: '/quiz/[id]',
        params: {
          id: quizId
        }
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Completed</Text>

      {quiz && (
        <Text style={styles.quizTitle}>{quiz.title}</Text>
      )}

      <ResultSummary
        score={numericScore}
        totalQuestions={numericTotalQuestions}
        timeSpent={numericTimeSpent}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleGoHome}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleTryAgain}
      >
        <Text style={styles.secondaryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  quizTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  secondaryButtonText: {
    color: '#007bff'
  }
});