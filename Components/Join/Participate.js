import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native"

import { useFonts } from "expo-font"
import { SafeAreaView } from "react-native-safe-area-context"
// Required for side-effects
import { db } from "../Event/Firestore"
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore"
export default function Participate({ navigation, route }) {
  const [event, setevent] = useState([])
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const id = route.params.id
  useEffect(() => {
    const pepole = collection(db, "event", id, "participate")
    onSnapshot(pepole, (querySnapshot) => {
      const participate = []
      querySnapshot.forEach((doc) => {
        participate.push(doc.data())
      })
      setevent([...participate])
    })
  }, [])

  console.log(event)
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ marginVertical: 10 }}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text
          style={{ color: "#FF6347", fontSize: 20, fontFamily: "OpanSans" }}
        >
          Close
        </Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 25, fontFamily: "OpanSans" }}>
          Participants
        </Text>
      </View>
      <FlatList
        data={event}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View
            style={{
              height: 60,
              bordereTopColor: "#ececec",
              borderTopWidth: 1,
              bordereBottomColor: "#ececec",
              borderBottomWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "100%",
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.image}
                source={require("../../Photo/user.png")}
              />
            </View>
            <Text style={styles.name}>{item.username}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginHorizontal: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "OpanSans",
  },
  image: {
    marginVertical: 10,
    borderColor: "gray",
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
})
