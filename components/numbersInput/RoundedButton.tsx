import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
    value: string
    onPress: (value: string) => void
    color?: string
}

const RoundedButton = ({ value, onPress, color }: Props) => {
    const checkedColor = color !== "red" ? "#fff" : "#c40606ff";

    return (
        <View style={[styles.roundedButtonContainer, { borderColor: checkedColor }]}>
            <Pressable style={styles.button} onPress={() => onPress(value)}>
                <Text style={[styles.buttonText, { color: checkedColor }]} >{value}</Text>
            </Pressable>
        </View >
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
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})