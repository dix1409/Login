import React, { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native"

import { LinearGradient } from "expo-linear-gradient"
import * as Animatable from "react-native-animatable"
//import LinearGradient from "react-native-linear-gradient"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { Ionicons } from "@expo/vector-icons"
// import Fire from '../Fire';
// import UserPermissions from '../utilities/UserPermissions';
//import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from "../Components/Event/Firestore"
const { height, width } = Dimensions.get("window")
const RegisterScreen = ({ navigation }) => {
  const [secureTextEntry, setsecurePassword] = useState(true)
  //const [confirm, setconfirm] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef()

  const handleSignUp = () => {
    setIsLoading(true)
    if (password.trim().length < 6 || email === "") {
      setIsLoading(false)
      setError("Please enter password more then 6 characters")
      // navigation.navigate("Register")
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      })
    } else {
      createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then((user) => {
          // console.log("yes"),

          setIsLoading(false),
            navigation.navigate("Profile", {
              email: email,
            }),
            setDoc(doc(db, "user", email), {
              userEmail: email,
              userPassword: password,
            })
        })
        .catch((err) => {
          setError(err.message)
          navigation.navigate("Register")
        })
    }
  }

  const updateSecureTextEntry = () => {
    setsecurePassword(!secureTextEntry)
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <View
          style={{
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
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
          <View style={styles.footer}>
            <View style={styles.errorMessage}>
              {!!error && <Text style={styles.error}>{error}</Text>}
            </View>
            {/* <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setName(val)}
            />
            {name ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View> */}
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Email Address
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Email Address"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setEmail(val)}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                secureTextEntry={secureTextEntry}
                style={styles.textInput}
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

            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up you agree to our
              </Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Terms of service
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Privacy policy
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Register
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: "black" }}>
                  Already have an account?
                  <Text style={{ color: "#2F80ED" }}>Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // paddingHorizontal: 20,
    // paddingBottom: 50,
    // marginTop: 30,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,

    marginBottom: 40,
  },
  text_header: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "black",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  errorMessage: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#FF3B30",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
})
export default RegisterScreen
