import "react-native-gesture-handler"

import React, { useState, useEffect } from "react"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { onAuthStateChanged } from "firebase/auth"
import HomeScreen from "./screen/HomeScreen"
import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
import ForgatPassword from "./screen/ForgatPassword"
import { LogBox } from "react-native"
import OnboardingScreen from "./screen/Slider"
import Profile from "./screen/Profile"
import { navigationRef } from "./Nav/RootNavigation"
import { auth } from "./Components/Event/Firestore"
const AppStack = createStackNavigator()
import * as RootNavigation from "./Nav/RootNavigation"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Load from "./screen/LoadScreen"
LogBox.ignoreAllLogs()
const App = () => {
  const [First, setFirst] = useState<boolean>()
  useEffect(() => {
    console.log("Rerendering 😱")
  })

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("First_Time")
      console.log(value)
      if (value !== null) {
        // value previously stored
        console.log("yesssss")
        setFirst(false)
        console.log(First)
      } else {
        setFirst(true)
        console.log(First)
      }
    } catch (e) {
      // error reading value
      setFirst(true)
    }
  }

  useEffect(() => {
    console.log(getData())
    const check = getData()
    const unsub = onAuthStateChanged(auth, (user) => {
      user
        ? RootNavigation.navigate("Home")
        : !First
        ? RootNavigation.navigate("Login")
        : RootNavigation.navigate("OnBordingScreen")
    })
    return unsub
  }, [First])

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="Load" component={Load} />
        <AppStack.Screen name="OnBordingScreen" component={OnboardingScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="Register" component={RegisterScreen} />
        <AppStack.Screen name="Profile" component={Profile} />
        <AppStack.Screen name="ForgatPassword" component={ForgatPassword} />
        <AppStack.Screen name="Home" component={HomeScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App
