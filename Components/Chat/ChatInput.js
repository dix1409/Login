import React from "react"
import { useContext, createContext } from "react"

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

import { useFonts } from "expo-font"
import { auth } from "../Event/Firestore"
import { SafeAreaView } from "react-native-safe-area-context"
import moment from "moment"
export default function ChatInput({ item }) {
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Regular.ttf"),
  })
  const [email, setemail] = useState("")
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  // console.log(item)
  const isMymsg = item.user === email ? true : false
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.msgContainer,
          {
            backgroundColor: !isMymsg ? "white" : "#34B7F1",
            marginLeft: isMymsg ? "40%" : 0,
            marginRight: !isMymsg ? "40%" : 0,
          },
        ]}
      >
        {!isMymsg && <Text style={styles.name}>{item.name}</Text>}
        <Text
          style={[
            styles.msg,
            {
              color: !isMymsg ? "#34B7F1" : "#FFFFFF",
            },
          ]}
        >
          {item.content}
        </Text>
        {/* <Text style={styles.time}>{moment(item.crateBy).fromNow()}</Text> */}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  msgContainer: {
    borderRadius: 20,
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "OpanSans",
  },
  msg: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 17,
    fontFamily: "OpanSans",
  },
  time: {
    alignSelf: "flex-end",
    color: "gray",
  },
})
