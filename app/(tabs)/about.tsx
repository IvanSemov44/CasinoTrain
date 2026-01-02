import RouletteTableWithChips from '@/components/Roulette/RouletteTableWithChips'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AboutScreen = () => {
  return (
    // <View style={styles.container}>
    //   <RouletteTable/>
    //   <Button label={''}/>
    // </View>
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar barStyle="light-content" /> */}
      <RouletteTableWithChips />
    </SafeAreaView>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  text: {
    color: "#fff"
  }
})