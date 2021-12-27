import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
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
export default function FourthEvent({ route, navigation }) {
  const eventTitle = route.params.eventTitle;
  const name = route.params.Name;
  const Date = route.params.Date;
  const Location = route.params.Location;
  const mode = route.params.mode;
  const skill = route.params.skill;
  const participate = route.params.participate;
  const [Comment, setComment] = useState("");
  const UpdateApp = () => {
    Inforef.add({
      name: name,
      Location: Location,
      mode: mode,
      eventTitle: eventTitle,
      skill: skill,
      participate: participate,
      Comment: Comment,
    }).then(() => {
      console.log("User added!");
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.greetingTitle}>Wanna Add Some Info?</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
            Additional Comments
          </Text>
        </View>
        <View style={styles.Input}>
          <TextInput
            style={styles.inputTitle}
            multiline={true}
            label={"More Infomation"}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          flex: 0.3,
          // marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#333",
            borderRadius: 26,
            height: 52,
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            textAlign: "center",
            bottom: 2,
          }}
          onPress={(text) => {
            navigation.navigate("First");
            setComment(text);
            UpdateApp();
          }}
        >
          <Text style={{ color: "white", fontFamily: "OpanSans" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    // justifyContent: "center",
    // alignItems: "center",
  },
  headerContainer: {
    justifyContent: "flex-start",
    marginTop: 32,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: "800",

    color: "#000",
    fontFamily: "OpanSans",
  },
  Input: {
    marginTop: 32,
    flex: 0.6,
    backgroundColor: "white",
    width: "80%",

    // alignItems: "center",
    justifyContent: "flex-start",
  },
  inputTitle: {
    width: "100%",
    height: "100%",
  },
});
