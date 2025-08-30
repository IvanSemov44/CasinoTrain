import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import RoundedButton from './RoundedButton'
import CheckButton from './CheckButton'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  onCheck: (value: string) => void;
  checkValue: boolean;
}

const Keyboard = ({ onCheck, checkValue }: Props) => {
  const [number, setNumber] = useState<string>('');

  const handlePress = (value: string) =>
    setNumber(prevNumber => prevNumber + value);

  const handleDelete = () =>
    setNumber(prevNumber => prevNumber.slice(0, -1));

  const handleCheck = () => {
    onCheck(number);
    setNumber('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{number}</Text>
      {checkValue ?
        <Ionicons name="checkmark" size={24} color="white" /> :
        <Ionicons name="close" size={24} color="white" />
      }

      <View style={styles.lineContainer}>
        <RoundedButton value={'1'} onPress={handlePress} />
        <RoundedButton value={'2'} onPress={handlePress} />
        <RoundedButton value={'3'} onPress={handlePress} />
      </View>
      <View style={styles.lineContainer}>
        <RoundedButton value={'4'} onPress={handlePress} />
        <RoundedButton value={'5'} onPress={handlePress} />
        <RoundedButton value={'6'} onPress={handlePress} />
      </View>
      <View style={styles.lineContainer}>
        <RoundedButton value={'7'} onPress={handlePress} />
        <RoundedButton value={'8'} onPress={handlePress} />
        <RoundedButton value={'9'} onPress={handlePress} />
      </View>
      <View style={styles.lineContainer}>
        <RoundedButton value={'⌫'} onPress={handleDelete} />
        <RoundedButton value={'0'} onPress={handlePress} />
        <CheckButton onPress={handleCheck} />
      </View>
    </View>
  )
}

export default Keyboard

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    marginVertical: 7
  }
})