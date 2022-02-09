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
  const event = route.params.event
  console.log(event)
  const [show, setshow] = useState(true)
  const email = route.params.email
  console.log(email)
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const time = new Date().getTime()

  //   useEffect(() => {
  //     console.log(email)
  //     if (email) {
  //       console.log(email)
  //       const userchatref = collection(db, `user/${email}/Ownevent`)
  //       const ownref = query(
  //         userchatref,
  //         where("expiredAt", ">", JSON.stringify(time)),
  //         orderBy("expiredAt", "desc")
  //       )
  //       onSnapshot(ownref, (querySnapshot) => {
  //         if (querySnapshot.empty) {
  //           setshow(false)
  //         } else {
  //           let eventTitle = []
  //           querySnapshot.forEach((doc) => {
  //             console.log(doc.data())
  //             eventTitle.push({ ...doc.data(), id: doc.id })
  //           })
  //           setevent([...eventTitle])
  //           setshow(true)
  //         }
  //       })
  //     }
  //   }, [])

  //   useEffect(() => {
  //     if (event.length == 0) {
  //       setshow(false)
  //     } else {
  //       setshow(true)
  //     }
  //   }, [event])
  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "100%", width: "100%" }}>
        {event.map((data) => (
          <View style={styles.box} key={data.id}>
            <View
              style={{
                justifyContent: "center",
                marginRight: "auto",
                marginLeft: 15,
              }}
            >
              <Text style={{ fontFamily: "OpanSans" }}>
                {data.name.toUpperCase()}
              </Text>
              {/* <View
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
              </View> */}
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
                  navigation.navigate("Chat", {
                    screen: "join",
                    params: { item: data, email: email },
                  })
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
        {/* {
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
        } */}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginVertical: 10,
    height: 70,
    backgroundColor: "#ffff",
    flexDirection: "row",
  },
  image: {
    marginVertical: 10,
    borderColor: "#999",
    marginRight: 15,
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
  },
})
