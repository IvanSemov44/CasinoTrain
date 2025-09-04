import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface TimerProps {
    time: number;
    isRunning: boolean;
}

const Timer = ({ time, isRunning }: TimerProps) => {
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.time, !isRunning && styles.pause]}>
                {formatTime(time)}
            </Text>
            {!isRunning && time > 0 && (
                <Text style={styles.pauseText}> (Paused)</Text>
            )}
        </View>
    )
}

export default Timer

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff'
    },
    pause: {
        color: '#6c757d'
    },
    pauseText: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4
    }
})