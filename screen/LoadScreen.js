import React from "react"
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native"

export default function LoadScreen(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../Photo/splashimage.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#75c475",
  },
})
