import React, { Component, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "../Components/Tabs";

export default function HomeScreen() {
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");

  // const useremail = firebase.auth().currentUser.email;
  // // setemail(useremail);
  // // setpassword(userpassword);
  // const signOut = () => {
  //   firebase.auth().signOut();
  // };
  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
