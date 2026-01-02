import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface QuizProgressProps {
    currentQuestion: number;
    totalQuestions: number;
    score: number;
}

const QuizProgress = ({
    currentQuestion,
    totalQuestions, 
    score
}: QuizProgressProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                    Question {currentQuestion} of {totalQuestions}
                </Text>
                {/* <Text style={styles.scoreText}>Score: {score}</Text> */}
            </View>
            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${(currentQuestion / totalQuestions) * 100}%` }
                    ]}>
                </View>
            </View>
        </View>
    )
}

export default QuizProgress

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 16,
        color: '#666'
    },
    scoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff'
    },
    progressBar: {
        height: 6,
        backgroundColor: '#e9ecef',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007bff',
        borderRadius: 3
    }
})