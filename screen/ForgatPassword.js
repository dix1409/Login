import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import styles from "./style"
import { useTheme } from "react-native-paper"
import { db, auth } from "../Components/Event/Firestore"
import { sendPasswordResetEmail } from "firebase/auth"
import { LinearGradient } from "expo-linear-gradient"
import * as Animatable from "react-native-animatable"
export default function ForgatPassword({ navigation }) {
  const [email, setemail] = useState("")
  const [Error, setError] = useState("")
  const [visible, setvisible] = useState(false)
  const { colors } = useTheme()

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email.trim())
      console.log("Password reset email sent successfully")
      setvisible(true)
      setTimeout(() => {
        setvisible(false)
        navigation.navigate("Login")
      }, 5000)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Forgot Password</Text>
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
            {!!Error && <Text style={styles.error}>{Error}</Text>}
          </View>
          <Modal transparent visible={visible}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "#fff",
                  paddingVertical: 30,
                  paddingHorizontal: 20,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../Photo/OIP-removebg-preview.png")}
                      style={{ width: 30, heigh: 30 }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setvisible(false)
                      }}
                    >
                      <Image
                        source={require("../Photo/R.png")}
                        style={{ width: 150, height: 150, marginVertical: 10 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      alignItems: "center",
                      marginVertical: 30,
                      fontSize: 20,
                    }}
                  >
                    Link Was Successfully Sent In Your Email
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
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
              onChangeText={(val) => setemail(val)}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={handlePasswordReset}
            >
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
              onPress={() => navigation.goBack()}
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
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  )
}
