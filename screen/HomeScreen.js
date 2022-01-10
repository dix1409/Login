import React, { Component, useState, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Tabs from "../Components/Tabs"
import * as Location from "expo-location"
import { db, auth } from "../Components/Event/Firestore"
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  addDoc,
  collectionGroup,
} from "firebase/firestore"
import { NavigationContainer } from "@react-navigation/native"
export default function HomeScreen() {
  const [isEmpty, setisEmpty] = useState(false)
  const [location, setlocation] = useState({})

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

  const email = auth.currentUser.email ? auth.currentUser.email : "unknown"

  useEffect(() => {
    const usersref = doc(db, "user", email, "location", "doc")
    //const userref = collection(db, users, "location")

    onSnapshot(usersref, (querySnapshot) => {
      if (!querySnapshot.exists()) {
        setisEmpty(true)
      }
    })
    if (isEmpty) {
      if (Object.entries(location).length != 0) {
        setDoc(doc(db, "user", email, "location", "doc"), location)
      }
      setisEmpty(false)
    }
  })

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
