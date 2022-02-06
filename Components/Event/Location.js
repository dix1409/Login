import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { uid } from "uid"
import { db, auth } from "./Firestore"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { Entypo, AntDesign } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore"

import { useFonts } from "expo-font"
const { height } = Dimensions.get("screen")
import CalculateGeoHash from "./GeoHash"
export default function FifthEvent({ route, navigation }) {
  const [visible, setvisible] = useState(false)
  const [vaild, setvalid] = useState(true)
  const [location, setlocation] = useState("")
  const [latitude, setlatitude] = useState(0)
  const [longitude, setlongitude] = useState(0)
  const [geoHash, setgeoHash] = useState("")
  useEffect(() => {
    if (latitude > 0 && longitude > 0) {
      setgeoHash(CalculateGeoHash(latitude, longitude))
    }
  }, [latitude, longitude])
  //   const [image, setimage] = useState({})

  //   const [loaded] = useFonts({
  //     OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  //   })
  //   const [email, setemail] = useState("")
  const [error, seterror] = useState("")
  //   useEffect(() => {
  //     const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
  //     setemail(emails)
  //   })
  //   const eventTitle = route.params.eventTitle
  //   const name = route.params.Name
  //   const hour = route.params.hour

  //   const mode = route.params.mode
  //   const skill = route.params.skill
  //   const participate = route.params.participate
  //   const comment = route.params.comment
  //   const participateCount = route.params.participateCount

  //   const fees = route.params.fees
  //   const [id, setid] = useState("")
  //   useEffect(() => {
  //     if (!id) {
  //       const ids = uid(16)
  //       setid(ids)
  //     }
  //   }, [])
  //   const check = () => {
  //     if (location === "") {
  //       return 0
  //     } else {
  //       return 1
  //     }
  //   }
  //   console.log(id)
  //   useEffect(() => {
  //     if (email) {
  //       const userref = collection(db, "user", email, "profile")
  //       onSnapshot(userref, (querySnapshot) => {
  //         if (querySnapshot.empty) {
  //           console.log("yes..")
  //           setvalid(false)
  //         } else {
  //           setvalid(true)
  //           let userprofile = []
  //           console.log("success")

  //           querySnapshot.forEach((doc) => {
  //             console.log(doc.data())
  //             userprofile.push({ ...doc.data(), id: doc.id })
  //           })
  //           console.log(userprofile)
  //           // setuser(userprofile)
  //           //  console.log(user)

  //           if (userprofile.length > 0) {
  //             userprofile.forEach((data) => {
  //               setimage(data)
  //             })
  //           }
  //         }
  //       })
  //     }
  //   }, [email])
  //   const UpdateApp = async () => {
  //     if (email) {
  //       // For Creater Profile
  //       if (vaild) {
  //         const Inforef = doc(db, "data", id)
  //         setDoc(Inforef, {
  //           name: name,
  //           location: location,
  //           mode: mode,
  //           eventTitle: eventTitle,
  //           skill: skill,
  //           participate: participate,
  //           comment: comment,
  //           date: date,
  //           count: participateCount,

  //           hours: hour,

  //           fees: fees,
  //           latitude: latitude,
  //           longitude: longitude,
  //           geoHash: CalculateGeoHash(latitude, longitude),
  //           //image: image.image,
  //           owner: image,
  //           hour: hour,
  //           expiredAt: new Date(date).getTime().toString(),
  //         })

  //         // own event
  //         const userRef = doc(db, "user", email, "Ownevent", id)
  //         setDoc(userRef, {
  //           name: name,
  //           location: location.trim(),
  //           mode: mode,
  //           eventTitle: eventTitle,
  //           skill: skill,
  //           participate: participate,
  //           comment: comment,
  //           date: date.trim(),

  //           hours: hour,

  //           count: participateCount,
  //           fees: fees.trim(),
  //           latitude: latitude,
  //           longitude: longitude,
  //           geoHash: CalculateGeoHash(latitude, longitude),
  //           //image: image.image,
  //           hour: hour,
  //           expiredAt: new Date(date).getTime().toString(),
  //         }).then(() => {
  //           setvisible(true)
  //         })
  //       } else {
  //         alert("Please Set Your Profile")
  //       }
  //     }
  //   }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.errorMessage}>
            {!!error && <Text style={styles.error}>{error}</Text>}
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
                  //   console.log(details)
                  setlocation(details.formatted_address)
                  setlatitude(details.geometry.location.lat)
                  setlongitude(details.geometry.location.lng)
                }}
                fetchDetails={true}
                keyboardShouldPersistTaps="always"
                nearbyPlacesAPI="GooglePlacesSearch"
                query={{
                  key: "AIzaSyCcN6s8ippd7mIFFE6tMcY8nFMffg83BuA",
                  language: "en",
                }}
                debounce={200}
                minLength={2}
                styles={{
                  container: {
                    width: "100%",
                  },
                  textInputContainer: {
                    borderBottomColor: "#8a8f9e",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  },
                }}
              />
            </View>
          </View>

          {/* <Modal transparent visible={visible}>
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
          </Modal> */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#D0FF6c",
                borderRadius: 26,
                height: 52,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",

                bottom: 2,
                marginBottom: 20,
              }}
              onPress={() => {
                navigation.navigate("Second", {
                  location: location,
                  latitude: latitude,
                  longitude: longitude,
                  geoHash: geoHash,
                })
              }}
            >
              <Text style={{ color: "black", fontFamily: "OpanSans" }}>
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
    backgroundColor: "#fff",
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
  errorMessage: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: 5,
  },
  error: {
    color: "#FF3B30",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
})
