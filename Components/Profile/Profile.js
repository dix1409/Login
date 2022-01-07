import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native"
import BottomSheet from "./BottomSheet"
import { useTheme } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Modal from "react-native-modalbox"
// import * as Animatable from "react-native-animatable"
//import BottomSheet from "@gorhom/bottom-sheet"
//import Animated from "react-native-reanimated"
import { db } from "../Event/Firestore"
import firebase from "firebase/compat/app"
import * as ImagePicker from "expo-image-picker"
const profileRef = db.collection("profile")
const { height, width } = Dimensions.get("window")
const EditProfileScreen = ({ navigation }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions()
  const auth = firebase.auth().currentUser.email
  const [image, setImage] = React.useState(null)

  const { colors } = useTheme()

  React.useEffect(() => {
    const ImageRef = profileRef.doc(auth).get((documentSnapshot) => {
      documentSnapshot.image
    })
    console.log(ImageRef)
  }, [])

  const takePhotoFromCamera = async () => {
    requestPermission()
    if (status.granted) {
      console.log("hello")
      let photo = await ImagePicker.launchCameraAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      })
      if (photo) {
        setImage(photo.uri)
      }
    }
  }

  const choosePhotoFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={styles.container}>
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

      <View style={styles.panel}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>

        <TouchableOpacity onPress={takePhotoFromCamera}>
          <LinearGradient
            style={styles.panelButton}
            colors={["#A9CBFF", "#5398F3"]}
          >
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={choosePhotoFromLibrary}>
          <LinearGradient
            style={styles.panelButton}
            colors={["#A9CBFF", "#5398F3"]}
          >
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setImage(null)}>
          <LinearGradient
            colors={["#A9CBFF", "#5398F3"]}
            style={styles.panelButton}
          >
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => {
          navigation.navigate("BottomSheet")
        }}
      >
        <Text style={styles.panelButtonTitle}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    margin: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
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
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginHorizontal: 20,
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
  },
  //
})
