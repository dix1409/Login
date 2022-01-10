import "react-native-gesture-handler"
//import { createAppContainer, createSwitchNavigator } from "react-navigation";
//import { createStackNavigator } from "react-navigation-stack";
import React, { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { onAuthStateChanged } from "firebase/auth"
import HomeScreen from "./screen/HomeScreen"
import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
import ForgatPassword from "./screen/ForgatPassword"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import * as firebase from "firebase";
import OnboardingScreen from "./screen/SplashScreen"
import { Provider } from "react-redux"
import { navigationRef } from "./Nav/RootNavigation"
import { auth } from "./Components/Event/Firestore"
const AppStack = createStackNavigator()
import * as RootNavigation from "./Nav/RootNavigation"

const App = () => {
  console.disableYellowBox = true
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    console.log("Rerendering 😱")
  })

  useEffect(async () => {
    // const appData = await AsyncStorage.getItem("isLoggedIn")
    // console.log(appData)
    // if (appData !== null) {
    //   setIsLoggedIn(true)
    //   RootNavigation.navigate("Home")
    // } else {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       savedata()
    //       RootNavigation.navigate("Home")
    //     }
    //   })
    // }
    const unsub = onAuthStateChanged(auth, (user) => {
      //console.log(user)
      if (user) {
        RootNavigation.navigate("Home")
      } else {
        RootNavigation.navigate("onBording")
      }
    })
    return unsub
  }, [])

  // const appData2 = AsyncStorage.getItem("isLoggedIn")
  // console.log(appData2)
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
        <AppStack.Screen name="ForgatPassword" component={ForgatPassword} />
        <AppStack.Screen name="Home" component={HomeScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App
