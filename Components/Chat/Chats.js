import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native"
import firebase from "firebase/compat/app"

require("firebase/firestore")
const firebaseConfig = {
  apiKey: "AIzaSyBi8VDfQchDQJLJNQ_mQO4EqxjfDTIlHJM",
  authDomain: "e-tuts.firebaseapp.com",
  projectId: "e-tuts",
  storageBucket: "e-tuts.appspot.com",
  messagingSenderId: "257278662825",
  appId: "1:257278662825:web:93fd59b2bf6e34bacc71b8",
  measurementId: "G-WP121F1W02",
}
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)
const auth = firebase.auth().currentUser.email
//LogBox.ignoreLogs("Setting a timer for a long period of time")
export default function Chats({ navigation, route }) {
  const event_id = route.params.user
  console.log(event_id)
  const Timestamp = firebase.firestore.Timestamp
  const massage = []
  useEffect(() => {
    db.collection("event")
      .doc(event_id)
      .collection("massage")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          massage.push({ data: doc.data(), id: doc.id })
        })
      })
    const finalmassage = []
    massage.forEach((doc) => {
      finalmassage = Object.keys(doc.data).map((key) => {
        valueobject = doc.data[key]
        finalmassage.push({ ...valueobject, docId: doc.id })
      })
    })
  }, [])

  const saveChat = (msg) => {
    let today = new Date()
    let curHr = today.toUTCString()
    db.collection("event")
      .doc(event_id)
      .collection("message")
      .doc()
      .set({
        content: "hi",
        CreattedAt: Timestamp.prototype.nanoseconds,
        sentBy: auth,
        isDelete: false,
      })
      .then(() => {
        Alert.alert("data added")
      })
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-start" }}></View>
      <View
        style={{
          flex: 0.07,
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",

          // marginHorizontal: 5,
          marginVertical: 6,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "78%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 50,
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Massage ⌨"
              style={{
                width: "80%",
                position: "absolute",
                marginHorizontal: 10,
              }}
              multiline={true}
            />
          </View>
        </View>
        <View
          style={{
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={saveChat}>
            <Text>send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
