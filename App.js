import "react-native-gesture-handler"
//import { createAppContainer, createSwitchNavigator } from "react-navigation";
//import { createStackNavigator } from "react-navigation-stack";
import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import LodingScreen from "./screen/LodingScreen"
import HomeScreen from "./screen/HomeScreen"
import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
// import * as firebase from "firebase";
import OnboardingScreen from "./screen/slides"
import { initializeApp } from "firebase/app"

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getDatabase, ref, onValue, set } from "firebase/database"
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
firebase.initializeApp(firebaseConfig)
const db = getDatabase()
const AppStack = createStackNavigator()
const AppNavigation = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Home" component={HomeScreen} />
  </AppStack.Navigator>
)

const AuthStack = createStackNavigator()
const AuthNavigation = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="onBording" component={OnboardingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
)

const App = () => {
  console.disableYellowBox = true
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // async function IsLoggedIn() {
  //   try {
  //     await new Promise((resolve, reject) =>
  //       firebase.auth().onAuthStateChanged(
  //         (user) => {
  //           if (user) {
  //             // User is signed in.

  //             resolve(user);
  //             return false;
  //           } else {
  //             // No user is signed in.
  //             reject("no user logged in");
  //             return false;
  //           }
  //         },
  //         // Prevent console error
  //         (error) => reject(error)
  //       )
  //     );
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
  // const Logged = IsLoggedIn();
  // console.log(Logged);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  })

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  )
}

export default App
