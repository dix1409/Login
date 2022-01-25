import React, { Component, useEffect, useState } from "react"
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
  Image,
  ScrollView,
} from "react-native"
import styles from "./style"
import { signInWithEmailAndPassword } from "firebase/auth"

import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { auth, db } from "../Components/Event/Firestore"

import { useTheme } from "react-native-paper"
import { collection, onSnapshot } from "firebase/firestore"
const LoginScreen = ({ navigation }) => {
  const [secureTextEntry, setsecurePassword] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setdone] = useState(false)
  const [valid, setvalid] = useState(false)
  const { colors } = useTheme()
  useEffect(() => {
    if (email) {
      const profileref = collection(db, `user/${email}/profile`)
      onSnapshot(profileref, (query) => {
        if (query.empty) {
          console.log("no....")
          setvalid(false)
        } else {
          console.log("yes...")
          setvalid(true)
        }
      })
    }
  }, [email])
  const handleLogin = () => {
    setIsLoading(true)

    console.log(valid)
    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((user) => {
        setIsLoading(false)
        valid
          ? navigation.navigate("Home")
          : navigation.navigate("Profile", {
              email: email,
            })
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
  const getData = () => {
    try {
      const value = AsyncStorage.getItem("isDone")
      console.log(value)
      if (value !== null) {
        // value previously stored
        console.log("yesssss")
        setdone(true)
      } else {
        console.log("no,,")
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
        <View style={{ justifyContent: "center", marginBottom: 30 }}>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Image
              source={require("../Photo/logo2.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome to Sportana</Text>
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
              placeholder="Your Email"
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
                Login
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
