import React, { useEffect, useState } from "react"
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
  Alert,
} from "react-native"
import { useFonts } from "expo-font"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { db, auth } from "./Firestore"
import { collection, onSnapshot } from "firebase/firestore"
import { SafeAreaView } from "react-native-safe-area-context"

const slide = [
  { id: 1, title: "Cricket", subTitle: "⚾ " },
  { id: 2, title: "Badminton", subTitle: "🏸 " },
  { id: 3, title: "Football", subTitle: "⚽ " },
  { id: 4, title: "Boxing", subTitle: "🥊 " },
]
export default function First({ navigation }) {
  const [email, setemail] = useState("")
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  useEffect(() => {
    const emails = auth.currentUser.email || "unknown"
    setemail(email)
  })
  // useEffect(() => {
  //   const eventRef=collection(db, `user/${email}/`)
  // },[email])
  let today = new Date()
  let curHr = today.getHours()
  let wishes: String
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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />
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
            resizeMode="contain"
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
                  onPress={() => {
                    navigation.navigate("Second", { name: "" })
                  }}
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
              <View style={{ justifyContent: "flex-end", width: "48%" }}>
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fpale-playing-football.png?alt=media&token=72eb4513-9947-4303-ad75-f2a475426da3",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: "4%" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                    borderColor: "#333",
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("Second", {
                      name: item.title,
                    })
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text>{item.subTitle}</Text>
                    <Text>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 5,
              fontFamily: "OpanSans",
            }}
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
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
