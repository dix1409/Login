import React, { useEffect, useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native"

import { db } from "../Event/Firestore"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons"
import { useFonts } from "expo-font"

import {
  query,
  collection,
  orderBy,
  where,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore"
const EventRef = collection(db, "data")
const { height } = Dimensions.get("screen")
export default function ShowEvent({ navigation, route }) {
  const [event, setevent] = useState([])
  const [show, setshow] = useState(true)
  const email = route.params.email
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const time = new Date().getTime()

  useEffect(() => {
    console.log(email)
    if (email) {
      console.log(email)
      const userchatref = collection(db, `user/${email}/Ownevent`)

      onSnapshot(userchatref, (querySnapshot) => {
        if (querySnapshot.empty) {
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
  }, [])

  //   useEffect(() => {
  //     if (event.length == 0) {
  //       setshow(false)
  //     } else {
  //       setshow(true)
  //     }
  //   }, [event])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: "100%", width: "100%" }}>
        {show &&
          event.map((data) => (
            <View style={styles.box} key={data.id}>
              <View
                style={{
                  justifyContent: "center",
                  marginRight: "auto",
                  marginLeft: 15,
                }}
              >
                <Text style={{ fontFamily: "OpanSans" }}>{data.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="clock"
                    size={15}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ marginRight: 10, fontFamily: "OpanSans" }}>
                    {data.date}
                  </Text>
                  <Text>{data.time}</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("delete", { event: data, email: email })
                  }
                >
                  <View
                    style={[
                      styles.image,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <AntDesign name="arrowright" size={30} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        {!show && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              height: height * 0.9,
            }}
          >
            <MaterialCommunityIcons
              name="cog-clockwise"
              size={100}
              style={{ color: "gray" }}
            />
            <Text style={{ color: "gray", fontSize: 25 }}>No Records</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginVertical: 10,
    height: 100,
    backgroundColor: "#ffff",
    flexDirection: "row",
  },
  image: {
    marginVertical: 10,
    borderColor: "#999",
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
})
