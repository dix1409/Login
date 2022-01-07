import React, { Component, useState, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { NavigationContainer } from "@react-navigation/native"
import Tabs from "../Components/Tabs"
import * as Location from "expo-location"
import { db } from "../Components/Event/Firestore"
export default function HomeScreen() {
  const [isEmpty, setisEmpty] = useState(false)
  const [location, setlocation] = useState({})
  const auth = firebase.auth().currentUser.email
  console.log(auth)
  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await Location.requestBackgroundPermissionsAsync()
      if (hasPermission.status === "granted") {
        const permission = await askPermission()
        return permission
      }
      return true
    }

    const askPermission = async () => {
      const permission = await Location.getCurrentPositionAsync()
      return permission.status === "granted"
    }
    checkPermission()

    const getUserLocation = async () => {
      const userLocation = await Location.getCurrentPositionAsync()

      if (Object.entries(userLocation.coords).length != 0) {
        console.log("yahooo")
        setlocation({ ...userLocation.coords })
      }
      return userLocation.coords
    }
    getUserLocation()
  }, [])

  useEffect(() => {
    db.collection("user")
      .doc(auth)
      .collection("location")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.size === 0) {
          setisEmpty(true)
        }
      })
    if (isEmpty) {
      if (Object.entries(location).length != 0) {
        db.collection("user").doc(auth).collection("location").add(location)
      }
      setisEmpty(false)
    }
  }, [])
  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
