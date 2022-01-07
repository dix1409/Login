import React, { useState, useEffect } from "react"
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

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

export default function Participate({ navigation, route }) {
  const [event, setevent] = useState([])
  const id = route.params.id
  useEffect(() => {
    db.collection("event")
      .doc(id)
      .collection("participate")
      .onSnapshot((querySnapshot) => {
        const participate = []
        querySnapshot.forEach((doc) => {
          participate.push(doc.data())
        })
        setevent([...participate])
      })
  }, [])
  console.log(event)
  return (
    <View>
      {event.map((item) => {
        return (
          <View>
            <Text>{item.username}</Text>
          </View>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {},
})
9
