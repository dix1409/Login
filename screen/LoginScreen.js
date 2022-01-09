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

const LoginScreen = ({ navigation }) => {
  const [secureTextEntry, setsecurePassword] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { colors } = useTheme()
  const handleLogin = () => {
    // setIsLoading(true)

    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((user) => {
        alert("login successful")

        setIsLoading(false)

        navigation.navigate("Home")
      })
      .catch((err) => {
        alert("login successful")
        setIsLoading(false)
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
  const updateSecureTextEntry = () => {
    setsecurePassword(!secureTextEntry)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
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
            <Text style={{ color: "#FF6347", marginTop: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
              <LinearGradient
                colors={["#FFA07A", "#FF6347"]}
                style={styles.signIn}
              >
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
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={[
                styles.signIn,
                {
                  borderColor: "#FF6347",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#FF6347",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen
