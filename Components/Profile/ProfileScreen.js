import React, { useEffect, useState } from "react"
import { StatusBar, TouchableOpacity } from "react-native"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native"
import { useFonts } from "expo-font"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { db, auth } from "../Event/Firestore"
import { onSnapshot, doc, collection } from "firebase/firestore"
import * as Animatable from "react-native-animatable"
import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

const { height, width } = Dimensions.get("window")

export default function ProfileScreen({ navigation, route }) {
  const [Image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fuser.png?alt=media&token=ff0f0135-7005-41c4-b448-02a08d428789"
  )
  const [userProfile, setuserProfile] = useState([])
  const [userdata, setuserdata] = useState({})
  const [showuserdata, setshowuserdata] = useState(false)
  const [joinEvent, setjoinEvent] = useState("0")
  const [ownEvent, setownEvent] = useState("0")
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const [email, setemail] = useState("")
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  useEffect(() => {
    //   Join Event
    if (email) {
      const usejoinRef = collection(db, "user", email, "joinEvent")
      onSnapshot(usejoinRef, (querySnapshot) => {
        setjoinEvent(querySnapshot.size)
      })

      // Craete Event
      const userownRef = collection(db, "user", email, "Ownevent")
      onSnapshot(userownRef, (querySnapshot) => {
        setownEvent(querySnapshot.size)
      })
      const profileref = collection(db, "user", email, "profile")

      onSnapshot(profileref, (querySnapshot) => {
        let Profile = []
        querySnapshot.forEach((doc) => {
          Profile.push({ ...doc.data(), id: doc.id })
        })
        setuserProfile([...Profile])
      })
    }
  }, [email])

  useEffect(() => {
    if (userProfile.length > 0) {
      setshowuserdata(true)

      userProfile.map((profile) => {
        setuserdata(profile)
      })
      if (Object.keys(userdata).length > 0) {
        setImage(userdata.image)
        console.log(Image)
      }
    }
  })

  //console.log(Image)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />

      <View style={styles.bgImage}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            height: height * 0.15,
            marginHorizontal: 15,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "OpanSans",
              color: "#000000",

              marginTop: height * 0.05,
            }}
          >
            Profile
          </Text>
        </View>

        <View
          style={{
            marginTop: height * 0.1,
            height: height * 0.75,
            backgroundColor: "#fff",
            //  alignItems: "center",
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            width: width,
          }}
        >
          <View style={{ width: "100%", alignItems: "center", height: "100%" }}>
            <View
              style={{
                height: 120,
                width: 120,
                borderColor: "gray",
                borderWidth: 2,
                bottom: "10%",
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#fafafa",
              }}
            >
              <ImageBackground
                source={{ uri: Image }}
                style={{
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 30 }}
                resizeMode="cover"
              >
                {!Image && (
                  <AntDesign
                    name="user"
                    size={75}
                    color="black"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: 10,
                    }}
                  />
                )}
              </ImageBackground>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                padding: 0,
                bottom: "10%",
              }}
            >
              {/* <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 5,
                  width: "100%",
                  height: 20,
                }}
                onPress={() =>
                  navigation.navigate("Edit", {
                    Profile: userdata,
                  })
                }
              >
                <AntDesign name="edit" size={20} color="#8fa8c8" />
                <Text
                  style={{
                    textAlign: "center",
                    marginStart: 10,
                    color: "#5398F3",
                    fontFamily: "OpanSans",
                  }}
                >
                  Edit data
                </Text>
              </TouchableOpacity> */}
            </View>
            {!showuserdata && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: width * 0.7,
                    height: 40,
                    borderColor: "black",
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      navigation.navigate("profile", {
                        email: email,
                      })
                    }}
                  >
                    <FontAwesome name="plus" size={20} color="black" />
                    <Text style={{ marginStart: 10 }}>Add profile</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: width * 0.7,
                    height: 40,
                    borderColor: "black",
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      auth.signOut()
                    }}
                  >
                    <Entypo name="log-out" size={24} color="black" />
                    <Text style={{ marginStart: 10 }}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {showuserdata && (
              <>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <View style={styles.action}>
                    <Text>{joinEvent}</Text>
                    <Text style={{ fontFamily: "OpanSans" }}>
                      Joined Events
                    </Text>
                  </View>
                  <View style={styles.action}>
                    <Text>{ownEvent}</Text>
                    <Text style={{ fontFamily: "OpanSans" }}>Your Events</Text>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                      navigation.navigate("info", {
                        userProfile: userdata,
                        email: email,
                      })
                    }}
                  >
                    <AntDesign name="user" size={24} color="#000" />
                    <Text style={styles.item}>Personal Info </Text>
                    <AntDesign name="arrowright" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => auth.signOut()}
                  >
                    <Feather name="log-out" size={24} color="black" />
                    <Text style={styles.item}>Log out</Text>
                    <AntDesign name="arrowright" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  action: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  btnContainer: {
    height: 65,
    width: "90%",
    marginTop: 25,
    backgroundColor: "#D0FF6C",
    alignItems: "center",
    borderRadius: 20,
  },
  box: {
    width: "95%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginStart: 10,
  },
  item: {
    fontSize: 20,
    marginStart: 10,
    color: "#000",
    marginRight: "auto",
    fontFamily: "OpanSans",
  },
})
