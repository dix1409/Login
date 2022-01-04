import React from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
} from "react-native"
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontlisto,
  MaterialIcons,
} from "@expo/vector-icons"
export default function ChatInput(props) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="gray" />
        <TextInput style={styles.textInput} multiline={true} />
      </View>
      <View style={styles.btnContainer}>
        <MaterialIcons name="send" size={28} color={white} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({})
