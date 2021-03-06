import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useFonts } from "expo-font";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { QuerySnapshot } from "firebase/firestore";
// Required for side-effects
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyBi8VDfQchDQJLJNQ_mQO4EqxjfDTIlHJM",
  authDomain: "e-tuts.firebaseapp.com",
  projectId: "e-tuts",
  storageBucket: "e-tuts.appspot.com",
  messagingSenderId: "257278662825",
  appId: "1:257278662825:web:93fd59b2bf6e34bacc71b8",
  measurementId: "G-WP121F1W02",
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const Inforef = db.collection("data");
const slide = [
  { id: 1, title: "⚾ Cricket" },
  { id: 2, title: "🏸 badminton" },
  { id: 3, title: "⚽ Football" },
  { id: 4, title: "🥊 Boxing" },
];
export default function First({ navigation }) {
  const [data, setdata] = useState([]);

  const getData = () => {
    Inforef.get().then((querySnapshot) => {
      console.log("Total users: ", querySnapshot.size);

      querySnapshot.forEach((documentSnapshot) => {
        let Data = [];
        Data.push(documentSnapshot.data());
        setdata([...data, Data]);
      });
    });
  };
  useEffect(() => {
    // Inforef.onSnapshot((querySnapShot) => {
    //   querySnapShot.forEach((doc) => {
    //     if (!Data.(doc.data())) {
    //       Data.push(doc.data());
    //     }
    //   });
    // });
    // if (data === []) {
    //   setdata(Data);
    // }
    getData();
  }, []);
  console.log(data);

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  let today = new Date();
  let curHr = today.getHours();
  let wishes;
  const TimeCheck = () => {
    if (curHr < 12) {
      wishes = "Good Morning";
    } else if (curHr < 17) {
      wishes = "Good Afternoon";
    } else {
      wishes = "Good Evening";
    }
    return wishes;
  };

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
      <View style={{ height: "40%" }}>
        <ImageBackground
          style={{ width: "100%", height: 200 }}
          source={require("../../Rectangle.png")}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                margin: 5,
              }}
            >
              <Text style={{ fontSize: 32, color: "#f7f7f7" }}>Create </Text>
              <Text
                style={{ fontSize: 32, color: "#f7f7f7", marginBottom: 15 }}
              >
                New Event
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
                source={require("../../pale-playing-football.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View>
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
                }}
              >
                <View>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
          Recommand Event
        </Text>
        {/* <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20 }}>There Is No Event Available</Text>
        </View> */}
        <ScrollView horizontal>
          {data.map((item) => {
            return (
              <View key={item.eventTitle}>
                <Text>{item.eventTitle}</Text>
                <Text>{item.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
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
});
