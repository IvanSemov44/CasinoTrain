import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';

type Props = {
    setChips: (value: number) => void
}

const ModalSettingsChips = ({ setChips }: Props) => {
    const [isVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedNumber, setSelectedNumber] = useState<string>('10');
    const numbers = ['1', '2', '3', '4', '5', '10', '15', '20', '40', '100'];

    const onModalClose = () => {
        setIsModalVisible(false);
    }

    const handleNumberSelect = (number: string) => {
        setSelectedNumber(number);
        setChips(Number(number));
        onModalClose();
    }

    const renderItem = (number: string) => {
        return (
            <Pressable
                onPress={() => handleNumberSelect(number)}>
                <Text style={styles.textOptions}>{number},</Text>
            </Pressable>
        )
    }

    return (
        <View>
            <Pressable onPress={() => setIsModalVisible(true)}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.text}>Total Chips: {selectedNumber}</Text>
                </View>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => onModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>ModalSettingsChips</Text>
                        <Pressable onPress={onModalClose}>
                            <MaterialIcons name="close" color="#fff" size={22} />
                        </Pressable>

                    </View>

                    <FlatList
                        horizontal
                        data={numbers}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={item => item}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default ModalSettingsChips

const styles = StyleSheet.create({
    modalContainer: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#fff',
        fontSize: 16
    },

    text: {
        color: "#fff"
    },
    textOptions: {
        color: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 5
    }
})