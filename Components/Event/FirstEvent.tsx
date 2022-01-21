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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { SafeAreaView } from "react-native-safe-area-context"

const slide = [
  { id: 1, title: "Cricket", subTitle: "⚾ " },
  { id: 2, title: "Badminton", subTitle: "🏸 " },
  { id: 3, title: "Football", subTitle: "⚽ " },
  { id: 4, title: "Boxing", subTitle: "🥊 " },
]
export default function First({ navigation }) {
  const [email, setemail] = useState("")
  const [show, setshow] = useState<boolean>()
  const [event, setevent] = useState([])
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  useEffect(() => {
    const emails = auth.currentUser.email || "unknown"
    setemail(emails)
  })
  useEffect(() => {
    if (email) {
      const eventRef = collection(db, `user/${email}/Ownevent`)
      const ref = query(eventRef, orderBy("date", "desc"))
      onSnapshot(ref, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("yess")
          setshow(false)
        } else {
          let events = []
          querySnapshot.forEach((doc) => {
            events.push({ ...doc.data(), id: doc.id })
            console.log(doc.data())
            console.log("yes")
          })
          setevent([...events])
          setshow(true)
          console.log(event)
        }
      })
    }
  }, [email])

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
        {/* <View
          style={{
            marginTop: 5,
            marginBottom: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>👋Heyy {TimeCheck()}</Text>
        </View> */}
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
              marginBottom: 10,
            }}
          >
            Your Events
          </Text>
          {!show && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
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
          )}
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
          {show && (
            <ScrollView>
              {event.map((item) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate("Chat", {
                      screen: "join",
                      params: { item: item },
                    })
                  }}
                >
                  <View style={styles.itemLeft}>
                    <View style={styles.square}></View>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                  <View style={styles.circular}></View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
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
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderColor: "#000",
    borderWidth: 1,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    fontSize: 18,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
})
