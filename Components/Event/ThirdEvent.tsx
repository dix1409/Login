import React, { useState, useEffect, useRef } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native"
import { useFonts } from "expo-font"
import * as Location from "expo-location"
import { SafeAreaView } from "react-native-safe-area-context"
import { useKeyboard } from "@react-native-community/hooks"

import { uid } from "uid"
import { auth, db } from "./Firestore"
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import CalculateGeoHash from "./GeoHash"
import { AntDesign, Entypo } from "@expo/vector-icons"
const { height, width } = Dimensions.get("window")

export default function ThirdScreen({ route, navigation }) {
  const [mode, setMode] = useState("")
  const [participate, setparticipate] = useState("")
  const [participateCount, setparticipatecount] = useState(0)
  const [fees, setfees] = useState("")

  const [skill, setskill] = useState("")
  const [error, seterror] = useState("")
  const [Comment, setComment] = useState("")
  const [image, setimage] = useState({})
  const [marginBottom, setMarginBottom] = useState(0)
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const [vaild, setvalid] = useState(true)
  const [email, setemail] = useState("")
  const [loading, setloading] = useState(false)
  const hour = route.params.hour
  const keyboard = useKeyboard()
  const eventTitle = route.params.eventTitle
  const Name = route.params.Name
  const date = route.params.date
  const latitude = route.params.latitude || 0
  const longitude = route.params.longitude || 0
  const geoHash = route.params.geoHash || ""
  const location = route.params.location
  const [visible, setvisible] = useState(false)
  console.log(hour)
  const [id, setid] = useState("")
  useEffect(() => {
    if (!id) {
      const ids = uid(16)
      setid(ids)
    }
  }, [])

  console.log(id)
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  useEffect(() => {
    if (email) {
      const userref = collection(db, "user", email, "profile")
      onSnapshot(userref, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("yes..")
          setvalid(false)
        } else {
          setvalid(true)
          let userprofile = []
          console.log("success")

          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            userprofile.push({ ...doc.data(), id: doc.id })
          })
          console.log(userprofile)
          if (userprofile.length > 0) {
            userprofile.forEach((data) => {
              setimage(data)
            })
          }
        }
      })
    }
  }, [email])

  const UpdateApp = async () => {
    setloading(true)
    if (email) {
      // For Creater Profile
      if (vaild) {
        const Inforef = doc(db, "data", id)
        setDoc(Inforef, {
          name: Name,
          location: location,
          mode: mode,
          eventTitle: eventTitle,
          skill: skill,
          participate: participate,
          comment: Comment,
          date: date,
          count: participateCount,

          hours: hour,

          fees: fees,
          latitude: latitude,
          longitude: longitude,
          geoHash: geoHash,
          //image: image.image,
          owner: image,
          hour: hour,
          expiredAt: new Date(date).getTime().toString(),
        })

        // own event
        const userRef = doc(db, "user", email, "Ownevent", id)
        setDoc(userRef, {
          name: Name,
          location: location.trim(),
          mode: mode,
          eventTitle: eventTitle,
          skill: skill,
          participate: participate,
          comment: Comment,
          date: date.trim(),
          hours: hour,
          count: participateCount,
          fees: fees.trim(),
          latitude: latitude,
          longitude: longitude,
          geoHash: CalculateGeoHash(latitude, longitude),
          //image: image.image,
          hour: hour,
          expiredAt: new Date(date).getTime().toString(),
        }).then(() => {
          setloading(false)
          setvisible(true)
        })
      } else {
        alert("Please Set Your Profile")
      }
    }
  }

  const check = () => {
    if (mode === "" || skill === "" || participate === "") {
      return 0
    } else {
      return 1
    }
  }

  useEffect(() => {
    if (!keyboard.keyboardShown) {
      setMarginBottom(0)
    }
  }, [keyboard.keyboardShown])
  //console.log(eventTitle, Name, date)
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingBottom: Platform.OS === "ios" ? marginBottom : 0 },
      ]}
    >
      {!loading && (
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.greetingTitle}>Additional Details</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.errorMessage}>
              {!!error && <Text style={styles.error}>{error}</Text>}
            </View>
            <Text style={{ fontFamily: "OpanSans" }}>Skill Level</Text>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <Pressable
                style={[
                  styles.btn,
                  {
                    backgroundColor: skill === "Beginner" ? "#D0FF6C" : "white",
                  },
                ]}
                onPress={() => {
                  setskill("Beginner")
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpanSans",

                    color: "black",
                  }}
                >
                  Beginner
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      skill === "Intermidate" ? "#D0FF6C" : "white",
                  },
                ]}
                onPress={() => {
                  setskill("Intermidate")
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpanSans",
                    color: "black",
                  }}
                >
                  Intermediate
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btn,
                  {
                    backgroundColor: skill === "Expert" ? "#D0FF6C" : "white",
                  },
                ]}
                onPress={() => {
                  setskill("Expert")
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpanSans",
                    color: "black",
                  }}
                >
                  Expert
                </Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={{ fontFamily: "OpanSans" }}>Participants</Text>
              <View style={{ marginTop: 15, flexDirection: "row" }}>
                <Pressable
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        participate === "Everyone" ? "#D0FF6C" : "white",
                    },
                  ]}
                  onPress={() => {
                    setparticipate("Everyone")
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpanSans",
                      color: "black",
                    }}
                  >
                    Everyone
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        participate === "Male" ? "#D0FF6C" : "white",
                    },
                  ]}
                  onPress={() => {
                    setparticipate("Male")
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpanSans",
                      color: "black",
                    }}
                  >
                    Male
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        participate === "Female" ? "#D0FF6C" : "white",
                    },
                  ]}
                  onPress={() => {
                    setparticipate("Female")
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpanSans",
                      color: "black",
                    }}
                  >
                    Female
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={[styles.greetingTitle, { fontSize: 14 }]}>
                Maximum Participants
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setparticipatecount(Number(text))
                }}
              />
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={{ fontFamily: "OpanSans" }}>Entry</Text>
              <View style={{ marginTop: 15, flexDirection: "row" }}>
                <Pressable
                  style={[
                    styles.btn,
                    {
                      backgroundColor: mode === "Paid" ? "#D0FF6C" : "white",
                    },
                  ]}
                  onPress={() => {
                    setMode("Paid")
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpanSans",
                      color: "black",
                    }}
                  >
                    Paid
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.btn,
                    {
                      backgroundColor: mode === "Free" ? "#D0FF6C" : "white",
                    },
                  ]}
                  onPress={() => {
                    setMode("Free")
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpanSans",
                      color: "black",
                    }}
                  >
                    Free
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginTop: 32 }}>
              {mode === "Paid" && (
                <View>
                  <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
                    Fees
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                      setfees(text)
                    }}
                  />
                </View>
              )}
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={[styles.greetingTitle, { fontSize: 14 }]}>
                Additional Comments
              </Text>
            </View>

            <TextInput
              style={{
                height: 100,
                alignContent: "flex-start",
                justifyContent: "flex-start",
                backgroundColor: "#f7f7f7",
                marginTop: 5,
              }}
              multiline={true}
              onChangeText={(text) => {
                setComment(text)
              }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                bottom: 0,
                flex: 0.3,
                // marginBottom: 10,
                marginVertical: 32,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#D0FF6C",
                  borderRadius: 26,
                  height: 52,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "60%",

                  bottom: 2,
                }}
                onPress={() => {
                  check() ? UpdateApp() : seterror("Please Fill All Details")
                }}
              >
                <Text style={{ color: "black", fontFamily: "OpanSans" }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#D0FF6C" size="large" />
        </View>
      )}
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
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    //
    width: "100%",
    height: height,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
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
  btn: {
    borderRadius: 7,
    marginRight: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  errorMessage: {
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#FF3B30",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: "80%",
    fontSize: 15,
    color: "#161f3d",
  },
})
