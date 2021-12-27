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
import { navigationRef } from "./Nav/RootNavigation"
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
import * as RootNavigation from "./Nav/RootNavigation"
const AuthStack = createStackNavigator()

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

  useEffect(() => {
    console.log("Rerendering 😱")
  })

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        RootNavigation.navigate("Home")
        setIsLoggedIn(true)
      } else {
        RootNavigation.navigate("Login")
        setIsLoggedIn(false)
      }
    })
    return unsub
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="onBording" component={OnboardingScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="Register" component={RegisterScreen} />
        <AppStack.Screen name="Home" component={HomeScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App
