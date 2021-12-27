import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import Fire from '../Fire';
// import UserPermissions from '../utilities/UserPermissions';
//import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [avatar, setAvatar] = useState();

  const [error, setError] = useState(null);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) =>
        userCredentials.user.updateProfile({
          displayName: name,
        })
      )
      .catch((err) => setError(err.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* <Image
        source={require('../assets/authHeader.png')}
        style={{ width: 504, resizeMode: 'contain', marginLeft: -50, marginTop: -140, marginBottom: 100 }}
      />
      <Image 
        source={require('../assets/authHeader.png')}
        style={{ width: 504, resizeMode: 'contain', position: 'absolute', bottom: -180, left: 50, opacity: 0.4, transform: [{ rotate: '-20deg' }] }}
      /> */}
      {/* 
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-round-back" size={32} color="#fff" />
      </TouchableOpacity> */}

      <View style={styles.headerContainer}>
        <Text style={styles.greetingTitle}>Sign Up</Text>
        <Text style={styles.greeting}>Sign up to get started.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.errorMessage}>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
            behaviors={"padding"}
          />
        </View>
        <View style={{ marginTop: 32 }}>
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 32 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "500", color: "#1F7EED" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: -100,
  },
  greetingTitle: {
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    color: "#1886B3",
    marginBottom: -5,
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#e9446a",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
    marginTop: -30,
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
    width: "100%",
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
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#C1CFD4",
    borderRadius: 48,
    marginTop: 48,
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
