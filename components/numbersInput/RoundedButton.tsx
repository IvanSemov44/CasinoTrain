import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
    value: string
    onPress: (value: string) => void
}

const RoundedButton = ({ value, onPress }: Props) => {
    return (
        <View style={styles.roundedButtonContainer}>
            <Pressable style={styles.button} onPress={() => onPress(value)}>
                <Text style={styles.buttonText} >{value}</Text>
            </Pressable>
        </View>
    )
}

export default RoundedButton

const styles = StyleSheet.create({
    roundedButtonContainer: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 42,
        padding: 3
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})