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
import { uid } from "uid"
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontlisto,
  MaterialIcons,
} from "@expo/vector-icons"
import SafeAreaView from "react-native-safe-area-context"
import style from "./style"
import {
  doc,
  setDoc,
  onSnapshot,
  where,
  query,
  orderBy,
  Timestamp,
  collection,
  collectionGroup,
  addDoc,
} from "firebase/firestore"
import { db, auth } from "../Event/Firestore"

import { useTheme } from "react-navigation"
import ChatInput from "./ChatInput"
import moment from "moment"

//LogBox.ignoreLogs("Setting a timer for a long period of time")
export default function Chats({ navigation, route }) {
  const [disable, setdisable] = useState(false)
  const [username, setusername] = useState("")
  const [msg, setmsg] = useState()
  const [Allmsg, setAllmsg] = useState([])

  const event_id = route.params.user
  //console.log(event_id)

  const Time = Timestamp.now().seconds
  const [email, setemail] = useState("")
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  useEffect(() => {
    if (email) {
      const nameRef = doc(db, "user", email)
      onSnapshot(nameRef, (documentSnapshot) => {
        let user = documentSnapshot.data()
        setusername(user.username)
      })
      const ChatRef = collection(db, `event/${event_id}/message`)
      const ref = query(ChatRef, orderBy("CrateBy", "desc"))

      onSnapshot(ref, (querySnapshot) => {
        let massage = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          massage.push({ ...doc.data(), id: doc.id })
        })
        setAllmsg([...massage])
      })
    }
  }, [email])
  //console.log(username)
  useEffect(() => {
    if (msg == null || msg == "") {
      setdisable(true)
    } else {
      setdisable(false)
    }
  })
  // console.log(Allmsg)
  const msgDel = collection(db, "event", event_id, "messsage")

  const saveChat = (msg, Time) => {
    addDoc(msgDel, {
      content: msg,
      CrateBy: Time,
      isDelete: false,
      user: email,
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
                saveChat(msg, Time)
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
