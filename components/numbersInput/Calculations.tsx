import { Pressable, StyleSheet, Text, View } from 'react-native'
import { use, useEffect, useState } from 'react'
import { newNumbers, Positions } from '@/utils/GenRandom';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type Props = {
    setTotal: (value: string) => void,
    chips: number,
    checkValue: boolean
}

const initialStateOfPositions: Positions = {
    StraightUp: 0,
    Split: 0,
    Corner: 0,
    Street: 0,
    SixLine: 0
};

const Calculations = ({ setTotal, chips, checkValue }: Props) => {
    const [numbers, setNumbers] = useState<Positions>(initialStateOfPositions);

    useEffect(() => {
        onReset();
    }, [])

    const onReset = () => {
        const [newNumber, total] = newNumbers(chips);

        setNumbers(newNumber);
        setTotal(total.toString());
    }

    useEffect(() => {
        onReset();
    }, [chips, checkValue===true])

    return (
        <View>
            <Text style={styles.text}>Straight Up x {numbers.StraightUp}</Text>
            <Text style={styles.text}>Split x {numbers.Split}</Text>
            <Text style={styles.text}>Corner x {numbers.Corner}</Text>
            <Text style={styles.text}>Street x {numbers.Street}</Text>
            <Text style={styles.text}>Six Line x {numbers.SixLine}</Text>

            <Pressable onPress={onReset}>
                <Text style={styles.text}>Reset</Text>
            </Pressable>

            {checkValue ?
                <Ionicons name="checkmark" size={24} color="white" /> :
                <Ionicons name="close" size={24} color="white" />
            }
        </View>
    )
}

export default Calculations

const styles = StyleSheet.create({
    text: {
        color: "#fff"
    }
})