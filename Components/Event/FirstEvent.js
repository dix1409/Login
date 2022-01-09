import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native"
import { useFonts } from "expo-font"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { db } from "./Firestore"

const slide = [
  { id: 1, title: "Cricket", subTitle: "⚾ " },
  { id: 2, title: "badminton", subTitle: "🏸 " },
  { id: 3, title: "Football", subTitle: "⚽ " },
  { id: 4, title: "Boxing", subTitle: "🥊 " },
]
export default function First({ navigation }) {
  // const getData = () => {
  //   Inforef.get().then((querySnapshot) => {
  //     console.log("Total users: ", querySnapshot.size);

  //     querySnapshot.forEach((documentSnapshot) => {
  //       let Data = [];
  //       Data.push(documentSnapshot.data());
  //       setdata([...data, Data]);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   Inforef.onSnapshot((querySnapShot) => {
  //     let DataTemp = []
  //     querySnapShot.forEach((doc) => {
  //       DataTemp.push(doc.data())
  //     })
  //     setdata(DataTemp)
  //   })
  // }, [])
  // console.log(data)

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  if (!loaded) {
    return null
  }

  let today = new Date()
  let curHr = today.getHours()
  let wishes
  const TimeCheck = () => {
    if (curHr < 12) {
      wishes = "Good Morning"
    } else if (curHr < 17) {
      wishes = "Good Afternoon"
    } else {
      wishes = "Good Evening"
    }
    return wishes
  }

  return (
    <View style={styles.container}>
      <StatusBar style={{ backgroundColor: "#f7f7f7" }} />
      <View
        style={{
          marginTop: 5,
          marginBottom: 10,
          padding: 10,
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>👋Heyy {TimeCheck()}</Text>
      </View>
      <View>
        <ImageBackground
          style={{ width: "100%", height: 200 }}
          source={require("../../Photo/Rectangle.png")}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                margin: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  color: "#f7f7f7",
                  fontFamily: "OpanSans",
                }}
              >
                Create{" "}
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  color: "#f7f7f7",
                  marginBottom: 15,
                  fontFamily: "OpanSans",
                }}
              >
                New Events
              </Text>
              <TouchableOpacity
                style={{
                  width: "80%",
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",

                  // marginVertical: 15,
                }}
                onPress={() => navigation.navigate("Second")}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={20}
                  color={"#9A9A9A"}
                />
                <Text
                  style={{
                    marginLeft: 1,
                    color: "#9A9A9A",
                    textAlign: "center",
                  }}
                >
                  Create Event
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "flex-end", width: "50%" }}>
              <Image
                source={require("../../Photo/pale-playing-football.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{ marginTop: "4%" }}>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {slide.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: 105,
                  height: 30,
                  backgroundColor: "#ffff",
                  marginLeft: 5,

                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                onPress={() => {
                  navigation.navigate("Second")
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>{item.subTitle}</Text>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView> */}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{ fontSize: 18, marginHorizontal: 5, fontFamily: "OpanSans" }}
        >
          Your Events
        </Text>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20, fontFamily: "OpanSans" }}>
            No Event Created{" "}
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "OpanSans" }}>
            Click On{" "}
            <Text
              style={{
                fontSize: 18,
                fontFamily: "OpanSans",
                fontWeight: "bold",
              }}
            >
              {" "}
              "Create Event"
            </Text>{" "}
            To Create Event.
          </Text>
        </View>
        {/* <ScrollView horizontal>
          {data.map((item) => {
            return (
              <View key={item.eventTitle}>
                <Text>{item.eventTitle}</Text>
                <Text>{item.name}</Text>
              </View>
            )
          })}
        </ScrollView> */}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "OpanSans",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
})
