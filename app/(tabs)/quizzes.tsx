import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { quizzes } from '@/constants/data'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const Quizzes = () => {
    const router = useRouter();

    const handleQuizPress = (quizId: string) => {
        router.push({
            pathname: '/quiz/[id]',
            params: { id: quizId }
        });
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Quiz Caetegories</Text>

            {quizzes.map((quiz) => (
                <TouchableOpacity
                    key={quiz.id}
                    style={styles.quizCard}
                    onPress={() => handleQuizPress(quiz.id)}
                >
                    <View style={styles.quizContent}>
                        <Text style={styles.quizTitle}>{quiz.title}</Text>
                        <Text style={styles.quizDescription}>{quiz.description}</Text>
                        <View style={styles.quizMeta}>
                            <Text style={styles.quizMetaText}>
                                {quiz.questions.length} questions
                            </Text>
                            <Text style={[
                                styles.quizDifficulty,
                                styles[DIFFICULTY_STYLES[quiz.difficulty]]
                            ]}>
                                {quiz.difficulty}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.quizIcon}>
                        <Ionicons
                            name="arrow-forward"
                            size={24}
                            color="#007bff"
                        />
                    </View>
                </TouchableOpacity>
            ))

            }
        </ScrollView>
    )
}

export default Quizzes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    quizCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    quizContent: {
        flex: 1
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333'
    },
    quizDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12
    },
    quizMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quizMetaText: {
        fontSize: 12,
        color: '#888',
    },
    quizDifficulty: {
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12
    },
    difficultyEasy: {
        backgroundColor: '#d4edda',
        color: '#155724'
    },
    difficultyMedium: {
        backgroundColor: '#fff3cd',
        color: '#856404'
    },
    difficultyHard: {
        backgroundColor: '#f8d7da',
        color: '#721c24'
    },
    quizIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
    }
})

const DIFFICULTY_STYLES = {
    easy: 'difficultyEasy',
    medium: 'difficultyMedium',
    hard: 'difficultyHard',
} as const;