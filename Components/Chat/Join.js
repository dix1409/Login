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
import firebase from "firebase/app"
import { collection, doc, onSnapshot } from "firebase/firestore"
import { db, auth } from "../Event/Firestore"
import styles from "./style"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons"
// Required for side-effects

export default function Chatting({ navigation }) {
  const [event, setevent] = useState([])
  const [email, setemail] = useState("")
  const [show, setshow] = useState(false)

  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  useEffect(() => {
    console.log(email)
    if (email) {
      console.log(email)
      const userchatref = collection(db, `user/${email}/joinEvent`)

      onSnapshot(userchatref, (querySnapshot) => {
        if (querySnapshot.empty) {
          setshow(false)
        } else {
          setshow(true)
          let eventTitle = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            eventTitle.push(doc.data())
          })
          setevent([...eventTitle])
        }
      })

      console.log(event)
    }
  }, [email])
  return (
    <SafeAreaView style={stylecustom.container}>
      {show && (
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
                    email: email,
                    item: item,
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
      )}
      {!show && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <MaterialCommunityIcons
            name="cog-clockwise"
            size={100}
            style={{ color: "gray" }}
          />
          <Text style={{ color: "gray", fontSize: 25 }}>
            You have not joined any event
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
const stylecustom = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#fff",
  },
})
