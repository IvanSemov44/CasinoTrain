import { Pressable, StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    onPress: (value: string) => void
}

const CheckButton = ({ onPress }: Props) => {
    return (
        <View style={styles.roundedButtonContainer}>
            <Pressable style={styles.button} onPress={() => onPress('check')}>
                <Ionicons name="checkmark" size={24} color="#11a103ff" />
            </Pressable>
        </View>
    )
}

export default CheckButton

const styles = StyleSheet.create({
    roundedButtonContainer: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: '#11a103ff',
        borderRadius: 42,
        padding: 3
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
    }
})