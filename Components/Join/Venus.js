import React from "react"
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native"

export default function Venus(props) {
  return (
    <View style={styles.container}>
      <Text>Here some.. Venus are avaliable</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
