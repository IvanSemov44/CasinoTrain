import React from 'react'
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native'
import { Question } from '@/types'

interface QuestionCardProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (option: string) => void;
    selectedOption?: string | null;
    style?: StyleProp<ViewStyle>;
}

const QuestionCard = ({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
    selectedOption,
    style
}: QuestionCardProps) => {
    const handleOptionsSelect = (option: string) => {
        onAnswer(option);
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.progress}>
                Question {questionNumber} of {totalQuestions}
            </Text>
            <Text style={styles.question}>{question.question}</Text>

            {question.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionButton,
                        selectedOption === option && styles.selectedOption
                    ]}
                    onPress={() => handleOptionsSelect(option)}
                    disabled={!!selectedOption}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default QuestionCard

const styles = StyleSheet.create({
    container: {
        padding: 29,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    progress: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    optionButton:{
        padding:15,
        marginVertical:5,
        backgroundColor:'#f8f9fa',
        borderRadius:9,
        borderWidth:1,
        borderColor:'#e9ecec'
    },
    selectedOption:{
        backgroundColor:'#e7f3ff',
        borderColor:'#007bff'
    },
    optionText:{
        fontSize:16,
        color:'#333'
    }
})