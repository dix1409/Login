import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native"

import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons"

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
  deleteDoc,
} from "firebase/firestore"
import { db } from "../Event/Firestore"

import ChatInput from "./ChatInput"
const { height } = Dimensions.get("window")
export default function Chats({ navigation, route }) {
  const [disable, setdisable] = useState(true)
  const [username, setusername] = useState("")
  const [msg, setmsg] = useState<string>("")
  const [Allmsg, setAllmsg] = useState([])
  const [marginBottom, setMarginBottom] = useState(0)
  const [isDelete, setisdelete] = useState(false)
  const [show, setshow] = useState(false)
  const [load, setload] = useState(false)
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
              email: email,
            })
          }
          style={{ marginRight: 20 }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "OpanSans",
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            Go Details
          </Text>
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
        setusername(userdata.firstname)
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
    onSnapshot(doc(db, "event", event_id), (doc) => {
      // console.log("Current data: ", doc.data())
      if (doc.data()?.isDeleted) {
        setisdelete(true)
      } else {
        setisdelete(false)
      }
    })
  }, [])
  useEffect(() => {
    if (isDelete) {
      //  console.log("yopp")
      setshow(true)
    }
  }, [isDelete])
  useEffect(() => {}, [])
  //console.log(username)
  useEffect(() => {
    if (msg == null || msg == "") {
      setdisable(true)
    } else {
      setdisable(false)
    }
  }, [msg])

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
  const RemoveEvent = async () => {
    setload(true)
    const joinRef = doc(db, "user", email, "joinEvent", event_id)

    const participateRef = doc(db, "event", event_id, "participate", email)
    await deleteDoc(joinRef).then(async () => {
      await deleteDoc(participateRef).then(() => {
        setload(false)
        navigation.navigate("chatting")
      })
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

      <Modal transparent visible={show}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              paddingVertical: 30,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "100%",

                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    RemoveEvent()
                  }}
                >
                  <Entypo name="cross" size={50} color="black" />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  alignItems: "center",
                  marginVertical: 10,
                  fontSize: 20,
                }}
              >
                Host Deleted This Event
              </Text>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Feather name="alert-circle" size={150} color="#75C375" />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#D0FF6C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginVertical: 10,
                  width: "80%",
                  height: height * 0.07,
                }}
                onPress={RemoveEvent}
              >
                <Text
                  style={{
                    fontSize: 15,

                    color: "black",
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
      {load && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator color="#D0FF6C" size="large" />
        </View>
      )}
    </View>
  )
}
