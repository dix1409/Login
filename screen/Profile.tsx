import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"

import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth, db, store } from "../Components/Event/Firestore"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import * as ImagePicker from "expo-image-picker"
import { uid } from "uid"

import { BottomSheet } from "react-native-btr"
const EditProfileScreen = ({ navigation, route }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions()
  const [url, seturl] = useState("")
  const [image, setImage] = useState(null)
  const [first, setfirst] = useState("")
  const [last, setlast] = useState("")
  const [phone, setphone] = useState("")
  const [country, setcountry] = useState("")
  const [city, setcity] = useState("")
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState("")
  const [load, setload] = useState(false)
  const [age, setage] = useState("")
  const [gender, setgender] = useState("")
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible)
  }
  const email = route.params.email

  useEffect(() => {
    if (image) {
      uploadimage(image)
    }
  }, [image])
  const takePhotoFromCamera = async () => {
    requestPermission()
    if (status.granted) {
      console.log("hello")
      let photo = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 1,
        base64: true,
      })
      if (!photo.cancelled) {
        setImage(photo.uri)
      }
    }
  }
  const uploadimage = async (uri: RequestInfo) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const refs = ref(store, email)

    uploadBytes(refs, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!")
      getDownloadurl()
    })
  }
  const getDownloadurl = () => {
    const starsRef = ref(store, email)

    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        seturl(url)
        console.log(url)
        setload(false)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break
          case "storage/canceled":
            // User canceled the upload
            break

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break
        }
      })
  }
  const choosePhotoFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    })

    // console.log(result.base64)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const submitDetail = () => {
    console.log(first)
    const profileref = doc(db, "user", email, "profile", uid(15))
    setDoc(profileref, {
      firstname: first,
      lastname: last,
      phone: phone,
      country: country,
      city: city,
      image: url,
      age: age,
      gender: gender,
    }).catch((err) => {
      console.log(err)
    })
  }
  const Check = () => {
    if (
      first === "" ||
      last === "" ||
      phone === "" ||
      city === "" ||
      country === ""
    ) {
      setError("Fill All Details")
      return 0
    } else {
      submitDetail()
      getdata()
      navigation.navigate("Home")
    }
  }
  const getdata = async () => {
    try {
      await AsyncStorage.setItem("isDone", "true")
      console.log("here ...")
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {!load && (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.container}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <AntDesign name="arrowleft" size={24} color="#5398F3" />
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: "gray",
                      borderWidth: 3,
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: image,
                      }}
                      style={{ height: 100, width: 100 }}
                      imageStyle={{ borderRadius: 15 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {!image && (
                          <Icon
                            name="camera"
                            size={35}
                            color="gray"
                            style={{
                              opacity: 0.7,
                              alignItems: "center",
                              justifyContent: "center",
                              borderWidth: 1,
                              borderColor: "#fff",
                              borderRadius: 10,
                            }}
                          />
                        )}
                      </View>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <TouchableOpacity
                    onPress={toggleBottomNavigationView}
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <AntDesign name="edit" size={20} color="#8fa8c8" />
                    <Text
                      style={{
                        textAlign: "center",
                        marginStart: 10,
                        color: "#5398F3",
                      }}
                    >
                      Edit Photo
                    </Text>
                  </TouchableOpacity>
                </View>
                {error.length > 0 && (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      height: 20,
                    }}
                  >
                    <Text style={{ color: "red", fontSize: 15 }}>{error}</Text>
                  </View>
                )}
                <BottomSheet
                  visible={visible}
                  //setting the visibility state of the bottom shee
                  onBackButtonPress={toggleBottomNavigationView}
                  //Toggling the visibility state on the click of the back botton
                  onBackdropPress={toggleBottomNavigationView}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  {/*Bottom Sheet inner View*/}
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: "100%",
                      height: 350,
                      borderTopStartRadius: 30,
                      borderTopEndRadius: 30,
                    }}
                  >
                    <View style={styles.panel}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.panelTitle}>Upload Photo</Text>
                        <Text style={styles.panelSubtitle}>
                          Choose Your Profile Picture
                        </Text>
                      </View>

                      <TouchableOpacity onPress={takePhotoFromCamera}>
                        <LinearGradient
                          style={styles.panelButton}
                          colors={["#D0FF6C", "#D0FF6C"]}
                        >
                          <Text style={styles.panelButtonTitle}>
                            Take Photo
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={choosePhotoFromLibrary}>
                        <LinearGradient
                          style={styles.panelButton}
                          colors={["#D0FF6C", "#D0FF6C"]}
                        >
                          <Text style={styles.panelButtonTitle}>
                            Choose From Library
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          toggleBottomNavigationView()
                          setImage(null)
                        }}
                      >
                        <LinearGradient
                          colors={["#D0FF6C", "#D0FF6C"]}
                          style={styles.panelButton}
                        >
                          <Text style={styles.panelButtonTitle}>Cancel</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </BottomSheet>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setfirst(text)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setlast(text)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="phone" size={20} color="black" />
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setphone(text)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-circle" size={20} color="black" />
                  <TextInput
                    placeholder="age"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setage(text)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="transgender" size={20} color="black" />
                  <TextInput
                    placeholder="Gender"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setgender(text)}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="globe" color={colors.text} size={20} />
                  <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setcountry(text)}
                    value={country}
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome name="map-marker" size={20} color="black" />
                  <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    onChangeText={(text) => setcity(text)}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.commandButton, { backgroundColor: "#D0FF6C" }]}
                  onPress={Check}
                >
                  <Text style={[styles.panelButtonTitle, { color: "black" }]}>
                    Done
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.commandButton}
                  onPress={() => {
                    getdata()
                    navigation.navigate("Home")
                  }}
                >
                  <Text style={[styles.panelButtonTitle, { color: "white" }]}>
                    skip
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  )
}
export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#f7f7f7",
    flex: 1,
    margin: 10,
    // paddingVertical: 10,
    // justifyContent: "center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  panel: {
    padding: 20,

    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
    marginBottom: "auto",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#A9CBFF",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginHorizontal: 20,
    //alignItems: "center",
    //justifyContent: "center",
    //height: 40,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: "#05375a",
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  //
})
