import React, { useState, useEffect } from "react"

import { StyleSheet, View, Text, Image, Dimensions } from "react-native"

import { useFonts } from "expo-font"
import { auth } from "../Event/Firestore"
const { height, width } = Dimensions.get("window")
export default function ChatInput({ item }) {
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Regular.ttf"),
  })
  const [email, setemail] = useState("")
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  //console.log(item)

  const isMymsg = item.user === email ? true : false

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.msgContainer,
          {
            backgroundColor: !isMymsg ? "black" : "#D0FF6C",
            marginLeft: isMymsg ? "auto" : 0,
            marginRight: !isMymsg ? "auto" : 0,
          },
        ]}
      >
        {!isMymsg && <Text style={styles.name}>{item.name}</Text>}
        <Text
          style={[
            styles.msg,
            {
              color: !isMymsg ? "#D0FF6C" : "#000",
            },
          ]}
        >
          {item.content}
        </Text>
        {/* <Text style={styles.time}>{moment(item.crateBy).fromNow()}</Text> */}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  msgContainer: {
    borderRadius: 20,
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "OpanSans",
    color: "white",
  },
  msg: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 17,
    fontFamily: "OpanSans",
    flex: 1,
    width: width * 0.4,
  },
  time: {
    alignSelf: "flex-end",
    color: "gray",
  },
})
