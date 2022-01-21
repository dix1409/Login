import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native"

import { collection, onSnapshot } from "firebase/firestore"
import { db, auth } from "../Event/Firestore"
import styles from "./style"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"

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
      const userchatref = collection(db, `user/${email}/Ownevent`)

      onSnapshot(userchatref, (querySnapshot) => {
        if (querySnapshot.exists) {
          setshow(false)
        } else {
          let eventTitle = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            eventTitle.push({ ...doc.data(), id: doc.id })
          })
          setevent([...eventTitle])
          setshow(true)
        }
      })
    }
  }, [email])
  return (
    <View style={stylecustom.container}>
      <StatusBar barStyle="dark-content" />
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
          <Text style={{ color: "gray", fontSize: 25 }}>No Records</Text>
        </View>
      )}
    </View>
  )
}
const stylecustom = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#fff",
  },
})
