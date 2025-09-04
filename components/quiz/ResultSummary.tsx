import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ResultSummaryProps {
    score: number;
    totalQuestions: number;
    timeSpent: number;
}

const ResultSummary = ({
    score,
    totalQuestions,
    timeSpent
}: ResultSummaryProps) => {
    const percentage = (score / totalQuestions) * 100;

    let performanceMessage = '';
    let performanceColor = '#007bff';

    if (percentage >= 80) {
        performanceMessage = 'Excellent!';
        performanceColor = '#28a745';
    } else if (percentage >= 60) {
        performanceMessage = 'Good Job!'
        performanceColor = '#17a2b8';
    } else if (percentage >= 40) {
        performanceMessage = 'Not Bad!';
        performanceColor = '#ffc107';
    } else {
        performanceMessage = 'Keep practicing!';
        performanceColor = '#dc3545';
    }

    return (
        <View style={styles.container}>
            <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>
                    {score}/{totalQuestions}
                </Text>
                <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
            </View>

            <Text style={[styles.message, { color: performanceColor }]}>
                {performanceMessage}
            </Text>

            <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Time Spent: </Text>
                    <Text style={styles.statValue}>
                        {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                    </Text>
                </View>

                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Correct Questions: </Text>
                    <Text style={[styles.statValue, { color: '#28a745' }]}>
                        {score}
                    </Text>
                </View>

                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Incorrect Questions: </Text>
                    <Text style={[styles.statValue, { color: '#dc3545' }]}>
                        {totalQuestions - score}
                    </Text>
                </View>
            </View>


        </View>
    )
}

export default ResultSummary

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    scoreCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 5,
        borderColor: '#007bff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    percentageText: {
        fontSize: 18,
        color: '#666',
        marginTop: 5
    },
    message:{
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 30
    },
    statsContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    statLabel: {
        fontSize: 16,
        color: '#666'
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
})