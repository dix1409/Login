import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import styles from "./style"
import { SafeAreaView } from "react-native-safe-area-context"
// Required for side-effects
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
export default function Chatting({ navigation }) {
  const [event, setevent] = useState([])
  const auth = firebase.auth().currentUser.email
  useEffect(() => {
    db.collection("user")
      .doc(auth)
      .collection("joinEvent")
      .onSnapshot((querySnapshot) => {
        let eventTitle = []
        querySnapshot.forEach((doc) => {
          eventTitle.push(doc.data())
        })
        setevent([...eventTitle])
      })
  }, [])
  console.log(event)
  return (
    <SafeAreaView style={stylecustom.container}>
      {/* {event.map((item) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("chats", {
                user: item.id,
              })
            }
            key={item.id}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )
      })} */}
      <FlatList
        data={event}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate("chats", {
                  user: item.id,
                  title: item.name,
                })
              }}
            >
              <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <View style={styles.circular}></View>
            </TouchableOpacity>
          </>
        )}
      />
    </SafeAreaView>
  )
}
const stylecustom = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
})
