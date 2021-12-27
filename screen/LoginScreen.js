import React, { Component, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setIsLoading(false)
      })
      .catch((err) => setError(err.message))
  }

  //   LayoutAnimation.easeInEaseOut();

  if (isLoading) {
    return <Text>Loading....</Text>
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* <Image
          source={require('../assets/authHeader.png')}
          style={{ width: 504, resizeMode: 'contain', marginLeft: -50, marginTop: -100, marginBottom: 0 }}
        />
        <Image 
          source={require('../assets/authHeader.png')}
          style={{ width: 504, resizeMode: 'contain', position: 'absolute', bottom: -180, left: 50, opacity: 0.4, transform: [{ rotate: '-20deg' }] }}
        />
        <Image
          source={require('../assets/loginLogo.png')}
          style={{ resizeMode: 'contain', width: 180, marginTop: -180, marginBottom: -100, alignSelf: 'center' }}
        />
   */}
      <Text style={styles.greeting}>{`SportApp`}</Text>

      <View style={styles.errorMessage}>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 32 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          New to SocialApp?{" "}
          <Text style={{ fontWeight: "500", color: "#1F7EED" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 48,
    fontWeight: "800",
    textAlign: "center",
    color: "#007AFF",
  },
  errorMessage: {
    height: 72,
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
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8a8f9e",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161f3d",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#1F7EED",
    borderRadius: 26,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
})
