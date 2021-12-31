import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { QuerySnapshot } from "firebase/firestore"
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
export default function joinEvent({ navigation, route }) {
  const [userdata, setuserdata] = useState([])
  const event = route.params.item
  const auth = firebase.auth().currentUser.email
  useEffect(() => {
    db.collection("user")
      .where("userEmail", "==", auth)
      .onSnapshot((querySnapshot) => {
        const user = []
        querySnapshot.forEach((doc) => {
          user.push(doc.data())
        })
        setuserdata(user)
      })
  }, [])
  let userinfo
  userdata.forEach((data) => {
    userinfo = data
  })
  console.log(userinfo)

  console.log(event)
  console.log(auth)
  const joinEvent = () => {
    db.collection("event")
      .doc(event.id)
      .collection("participate")
      .add({
        userinfo: userinfo,
      })
      .then(() => {
        Alert.alert("data added")
      })
    db.collection("user").doc(auth).collection("joinEvent").add({
      event: event,
    })
  }
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={joinEvent}>
          <Text>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
