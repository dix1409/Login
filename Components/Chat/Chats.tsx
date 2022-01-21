import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from "react-native"

import { MaterialIcons } from "@expo/vector-icons"

import { useKeyboard } from "@react-native-community/hooks"
import style from "./style"
import {
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  collection,
  addDoc,
} from "firebase/firestore"
import { db } from "../Event/Firestore"

import ChatInput from "./ChatInput"

export default function Chats({ navigation, route }) {
  const [disable, setdisable] = useState(true)
  const [username, setusername] = useState("")
  const [msg, setmsg] = useState<string>("")
  const [Allmsg, setAllmsg] = useState([])
  const [marginBottom, setMarginBottom] = useState(0)

  const event_id = route.params.user
  console.log(event_id)

  const Time = Timestamp.now().seconds
  const email = route.params.email
  const eventdetails = route.params.item
  const keyboard = useKeyboard()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("join", {
              item: eventdetails,
            })
          }
        >
          <Text style={{ color: "white" }}>Go Details</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])
  useEffect(() => {
    if (!keyboard.keyboardShown) {
      setMarginBottom(0)
      if (msg === "") {
        setdisable(true)
      }
    }
  }, [keyboard.keyboardShown])

  useEffect(() => {
    const nameRef = collection(db, `user/${email}/profile`)
    onSnapshot(nameRef, (querySnapshot) => {
      let user = []
      querySnapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id })
      })

      let userdata = Object.assign({}, ...user)
      if (userdata.firstname) {
        console.log("name: ", userdata.firstname)
        // setusername(userdata.firstname)
      }
    })
    const ChatRef = collection(db, `event/${event_id}/messsage`)
    const ref = query(ChatRef, orderBy("CrateBy", "desc"))

    onSnapshot(ref, (querySnapshot) => {
      let massage = []
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        massage.push({ ...doc.data(), id: doc.id })
      })
      setAllmsg([...massage])
    })
  }, [])
  //console.log(username)
  useEffect(() => {
    if (msg == null || msg == "") {
      setdisable(true)
    } else {
      setdisable(false)
    }
  }, [keyboard.keyboardShown])

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
    <View
      style={{
        flex: 1,
        paddingBottom: Platform.OS === "ios" ? marginBottom : 0,
        backgroundColor: "white",
      }}
    >
      <FlatList
        data={Allmsg}
        renderItem={({ item }) => <ChatInput item={item} />}
        inverted
        showsVerticalScrollIndicator={false}
      />

      <View style={style.container}>
        <View style={style.mainContainer}>
          {/* <FontAwesome5 name="laugh-beam" size={24} color="gray" /> */}
          <TextInput
            style={style.textInput}
            multiline={true}
            placeholder="Type a message"
            onChangeText={(val) => {
              setmsg(val)
            }}
            value={msg}
            onFocus={() => {
              setMarginBottom(270)
            }}
          />
        </View>
        <TouchableOpacity
          disabled={disable}
          onPress={() => {
            saveChat(msg, Time)
            setmsg("")
          }}
        >
          <View style={style.btnContainer}>
            <MaterialIcons name="send" size={26} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
