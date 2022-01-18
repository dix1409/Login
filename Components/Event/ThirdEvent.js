import React, { useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native"
import { useFonts } from "expo-font"
import * as Location from "expo-location"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ThirdScreen({ route, navigation }) {
  const [mode, setMode] = useState("")
  const [participate, setparticipate] = useState("")
  const [skill, setskill] = useState("")
  const [error, seterror] = useState("")
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  const eventTitle = route.params.eventTitle
  const Name = route.params.Name
  const date = route.params.date
  const chack = () => {
    if (mode === "") {
      return 0
    } else if (skill === "") {
      return 0
    } else if (participate === "") {
      return 0
    } else {
      return 1
    }
  }
  //console.log(eventTitle, Name, date)
  return (
    <SafeAreaView style={styles.container}>
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
                backgroundColor: skill === "Intermidate" ? "#D0FF6C" : "white",
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
                  backgroundColor: participate === "Male" ? "#D0FF6C" : "white",
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
          <Text style={{ fontFamily: "OpanSans" }}>Mode</Text>
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
        <View style={{ marginTop: 32 }}></View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          flex: 0.3,
          // marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#333",
            borderRadius: 26,
            height: 52,
            justifyContent: "center",
            alignItems: "center",
            width: "60%",

            bottom: 2,
          }}
          onPress={() => {
            chack()
              ? navigation.navigate("Fourth", {
                  eventTitle: eventTitle,
                  Name: Name,
                  date: date,

                  mode: mode.trim(),
                  skill: skill.trim(),
                  participate: participate.trim(),
                })
              : seterror("Please Fill All Detail")
          }}
        >
          <Text style={{ color: "white", fontFamily: "OpanSans" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    // justifyContent: "center",
    //
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 32,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
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
})
