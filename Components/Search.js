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

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { QuerySnapshot } from "firebase/firestore"
// Required for side-effects
require("firebase/firestore")
const firebaseConfig = {
  apiKey: "AIzaSyBi8VDfQchDQJLJNQ_mQO4EqxjfDTIlHJM",
  authDomain: "e-tuts.firebaseapp.com",
  projectId: "e-tuts",
  storageBucket: "e-tuts.appspot.com",
  messagingSenderId: "257278662825",
  appId: "1:257278662825:web:93fd59b2bf6e34bacc71b8",
  measurementId: "G-WP121F1W02",
}
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)
const Inforef = db.collection("data")

export default function First({ navigation }) {
  const [data, setdata] = useState([])

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

  useEffect(() => {
    Inforef.onSnapshot((querySnapShot) => {
      let DataTemp = []
      querySnapShot.forEach((doc) => {
        DataTemp.push(doc.data())
      })
      setdata(DataTemp)
    })
  }, [])
  console.log(data)

  const [loaded] = useFonts({
    OpanSans: require("../static/OpenSans/OpenSans-Medium.ttf"),
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
        <Text style={styles.title}>👋heyy {TimeCheck()}</Text>
      </View>
      <View>
        <ImageBackground
          style={{ width: "100%", height: 200 }}
          source={require("../Rectangle.png")}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                margin: 5,
              }}
            >
              <Text style={{ fontSize: 32, color: "#f7f7f7" }}>Explore </Text>
              <Text
                style={{ fontSize: 32, color: "#f7f7f7", marginBottom: 15 }}
              >
                New Event
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end", width: "50%" }}>
              <Image
                source={require("../")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 18, marginVertical: 10 }}>
          Recommand Event
        </Text>
        {/* <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20 }}>There Is No Event Available</Text>
        </View> */}
        <ScrollView horizontal style={{ marginVertical: 10 }}>
          {data.map((item) => {
            return (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: "#fff",
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              >
                <View key={item.eventTitle}>
                  <Text>{item.eventTitle}</Text>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
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
