import React, { useState, useEffect, useRef } from "react"
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
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAwareScrollView,
  Platform,
} from "react-native"

import KeyboardSpacer from "react-native-keyboard-spacer"
import firebase from "firebase/compat/app"
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontlisto,
  MaterialIcons,
} from "@expo/vector-icons"
import SafeAreaView from "react-native-safe-area-context"
import style from "./style"
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
import { useTheme } from "react-navigation"
import ChatInput from "./ChatInput"
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)
import moment from "moment"

//LogBox.ignoreLogs("Setting a timer for a long period of time")
export default function Chats({ navigation, route }) {
  const [disable, setdisable] = useState(false)
  const [username, setusername] = useState("")
  const [msg, setmsg] = useState()
  const [Allmsg, setAllmsg] = useState([])
  const auth = firebase.auth().currentUser.email
  const event_id = route.params.user
  //console.log(event_id)

  const Timestamp = firebase.firestore.Timestamp.now().seconds

  useEffect(() => {
    const name = db
      .collection("user")
      .doc(auth)
      .onSnapshot((documentSnapshot) => {
        let user = documentSnapshot.data()
        setusername(user.username)
      })

    db.collection("event")
      .doc(event_id)
      .collection("message")
      .orderBy("CrateBy", "desc")
      .onSnapshot((querySnapshot) => {
        let massage = []
        querySnapshot.forEach((doc) => {
          massage.push({ ...doc.data(), id: doc.id })
        })
        setAllmsg([...massage])
      })
    return name
  }, [])
  //console.log(username)
  useEffect(() => {
    if (msg == null || msg == "") {
      setdisable(true)
    } else {
      setdisable(false)
    }
  })
  // console.log(Allmsg)
  const msgDel = db.collection("event").doc(event_id).collection("message")

  const saveChat = (msg, Timestamp) => {
    msgDel.add({
      content: msg,
      CrateBy: Timestamp,
      isDelete: false,
      user: auth,
      name: username,
    })
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <>
        <FlatList
          data={Allmsg}
          renderItem={({ item }) => <ChatInput item={item} />}
          inverted
          showsVerticalScrollIndicator={false}
        />

        <KeyboardAvoidingView behavior="height">
          <View style={style.container}>
            <View style={style.mainContainer}>
              {/* <FontAwesome5 name="laugh-beam" size={24} color="gray" /> */}
              <TextInput
                style={style.textInput}
                multiline={true}
                placeholder="Type a message"
                onChangeText={(val) => setmsg(val)}
                value={msg}
              />
            </View>
            <TouchableOpacity
              disabled={disable}
              onPress={() => {
                saveChat(msg, Timestamp)
                setmsg()
              }}
            >
              <View style={style.btnContainer}>
                <MaterialIcons name="send" size={26} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  )
}
