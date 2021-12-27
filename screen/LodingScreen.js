import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export class LodingScreen extends Component {
  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged((user) =>
        this.props.navigation.navigate(user ? "App" : "Auth")
      );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Laoding....</Text>
        <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LodingScreen;
