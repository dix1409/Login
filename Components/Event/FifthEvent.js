import React, { useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { db, auth } from "./Firestore"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import DateTimePicker from "@react-native-community/datetimepicker"
import MapView from "react-native-maps"
import { Entypo, AntDesign } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { collection, doc, setDoc } from "firebase/firestore"

const { height, width } = Dimensions.get("screen")
export default function FifthEvent({ route, navigation }) {
  const date = route.params.date
  const [visible, setvisible] = useState(false)

  const [location, setlocation] = useState("")
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")

  const [email, setemail] = useState("")
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  const eventTitle = route.params.eventTitle
  const name = route.params.name
  const time = route.params.time
  const mode = route.params.mode
  const skill = route.params.skill
  const participate = route.params.participate
  const comment = route.params.comment
  const participateCount = route.params.participateCount
  const prize = route.params.prize
  const fees = route.params.fees
  const UpdateApp = () => {
    const Inforef = doc(collection(db, "data"))
    setDoc(Inforef, {
      name: name,
      location: location,
      mode: mode,
      eventTitle: eventTitle,
      skill: skill,
      participate: participate,
      comment: comment,
      date: date,
      count: participateCount,
      prize: prize.trim(),
      time: time.trim(),
      fees: fees,
      latitude: latitude,
      longitude: longitude,
    })
    const userRef = doc(collection(db, "user", email, "Ownevent"))
    setDoc(userRef, {
      name: name,
      location: location.trim(),
      mode: mode,
      eventTitle: eventTitle,
      skill: skill,
      participate: participate,
      comment: comment,
      date: date.trim(),
      prize: prize.trim(),
      time: time.trim(),
      count: participateCount.trim(),
      fees: fees.trim(),
      latitude: latitude,
      longitude: longitude,
    }).then(() => {
      setvisible(true)
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.greetingTitle}>Event Time and Location</Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <View style={{ height: height * 0.5, marginTop: 22 }}>
              <Text style={{ fontSize: 16, color: "black", marginVertical: 5 }}>
                Event Location
              </Text>

              <GooglePlacesAutocomplete
                placeholder="Set Location"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(details.formatted_address)
                  setlocation(details.formatted_address)
                  setlatitude(details.geometry.location.lat)
                  setlongitude(details.geometry.location.lng)
                }}
                fetchDetails={true}
                autoFocus={true}
                returnKeyType={"search"}
                keyboardShouldPersistTaps="always"
                nearbyPlacesAPI="GooglePlacesSearch"
                keyboardAppearance={"light"}
                query={{
                  key: "AIzaSyCcN6s8ippd7mIFFE6tMcY8nFMffg83BuA",
                  language: "en",
                }}
                debounce={400}
                minLength={2}
                styles={{
                  container: {
                    width: "80%",
                  },
                  textInputContainer: {
                    borderBottomColor: "#8a8f9e",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  },
                }}
              />
            </View>
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

                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setvisible(false)
                        navigation.navigate("First")
                      }}
                    >
                      <Entypo name="cross" size={50} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="checkcircle" size={150} color="#2ecc71" />
                  </View>

                  <Text
                    style={{
                      alignItems: "center",
                      marginVertical: 30,
                      fontSize: 20,
                    }}
                  >
                    Your Event Is Succesfully Created.
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                borderRadius: 26,
                height: 52,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
                textAlign: "center",
                bottom: 2,
                marginBottom: 20,
              }}
              onPress={() => {
                UpdateApp()
              }}
            >
              <Text style={{ color: "white", fontFamily: "OpanSans" }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f7f7f7",
  },
  inputTitle: {
    width: "100%",
    height: "100%",
  },
  input: {
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: "80%",
    fontSize: 15,
    color: "#161f3d",
  },
  headerContainer: {
    // alignItems: "center",
    //justifyContent: "flex-start",
    marginTop: 32,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: "800",

    color: "#000",
    fontFamily: "OpanSans",
  },
  form: {
    marginTop: 32,
    marginHorizontal: 30,
    flex: 0.7,
  },
})
