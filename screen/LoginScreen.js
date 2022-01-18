import React, { Component, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native"
import styles from "./style"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
//import SafeAreaView from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import * as Animatable from "react-native-animatable"
//import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { auth } from "../Components/Event/Firestore"
//import { TouchableWithoutFeedback } from "react-native-web"
import { useTheme } from "react-native-paper"
const LoginScreen = ({ navigation }) => {
  const [secureTextEntry, setsecurePassword] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setdone] = useState(false)
  const { colors } = useTheme()
  const handleLogin = () => {
    setIsLoading(true)
    getData()
    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((user) => {
        setIsLoading(false)
        done ? navigation.navigate("Home") : navigation.navigate("Profile")
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err.message)
        setError(err.message)
        navigation.navigate("Login")
      })
  }

  //   LayoutAnimation.easeInEaseOut();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("isDone")
      console.log(value)
      if (value !== null) {
        // value previously stored
        console.log("yesssss")
        setdone(true)
      } else {
        setdone(false)
      }
    } catch (e) {
      // error reading value
      setdone(false)
    }
  }
  const updateSecureTextEntry = () => {
    setsecurePassword(!secureTextEntry)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={{ justifyContent: "center" }}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>

          <View style={styles.errorMessage}>
            {!!error && <Text style={styles.error}>{error}</Text>}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}
          >
            Email Address
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={secureTextEntry}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setPassword(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgatPassword")
            }}
          >
            <Text style={{ color: "#2F80ED", marginTop: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={[
                styles.signIn,
                {
                  borderColor: "#000",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#f7f7f7",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity> */}

          <TouchableOpacity
            style={{ marginTop: 40, width: "100%", alignItems: "center" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text>
              Don’t have an account yet?
              <Text style={{ color: "#2F80ED", marginHorizontal: 5 }}>
                {" "}
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen
