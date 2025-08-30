import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Keyboard from '@/components/numbersInput/Keyboard'
import Calculations from '@/components/numbersInput/Calculations'

const Count = () => {
    const [total, setTotal] = useState<string>("0");
    const [checkValue, setCheckValue] = useState<boolean>(false);

    const handleTotalUpdate = (newTotal: string) => {
        setTotal(newTotal);
    }

    const handleCheck = (newNumber: string) => {
        if (total === newNumber) {
            setCheckValue(true);
        } else {
            setCheckValue(false);
        }
    }

    return (
        <View style={styles.container}>
            <Calculations setTotal={handleTotalUpdate} />
            <Keyboard onCheck={handleCheck} checkValue={checkValue} />
        </View>
    )
}

export default Count

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
    },
    text: {
        color: "#fff"
    }
})