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

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  const eventTitle = route.params.eventTitle
  const Name = route.params.Name
  const date = route.params.date

  console.log(eventTitle, Name, date)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greetingTitle}>Additional Details</Text>
      </View>
      <View style={styles.form}>
        <Text style={{ fontFamily: "OpanSans" }}>Skill Level</Text>
        <View style={{ marginTop: 15, flexDirection: "row" }}>
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: skill === "Beginner" ? "green" : "white",
              },
            ]}
            onPress={() => {
              setskill("Beginner")
            }}
          >
            <Text
              style={{
                fontFamily: "OpanSans",

                color: skill === "Beginner" ? "white" : "black",
              }}
            >
              Beginner
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: skill === "Intermidate" ? "green" : "white",
              },
            ]}
            onPress={() => {
              setskill("Intermidate")
            }}
          >
            <Text
              style={{
                fontFamily: "OpanSans",
                color: skill === "Intermidate" ? "white" : "black",
              }}
            >
              Intermediate
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: skill === "Expert" ? "green" : "white",
              },
            ]}
            onPress={() => {
              setskill("Expert")
            }}
          >
            <Text
              style={{
                fontFamily: "OpanSans",
                color: skill === "Expert" ? "white" : "black",
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
                    participate === "Everyone" ? "green" : "white",
                },
              ]}
              onPress={() => {
                setparticipate("Everyone")
              }}
            >
              <Text
                style={{
                  fontFamily: "OpanSans",
                  color: participate === "Everyone" ? "white" : "black",
                }}
              >
                Everyone
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.btn,
                {
                  backgroundColor: participate === "Male" ? "green" : "white",
                },
              ]}
              onPress={() => {
                setparticipate("Male")
              }}
            >
              <Text
                style={{
                  fontFamily: "OpanSans",
                  color: participate === "Male" ? "white" : "black",
                }}
              >
                Male
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.btn,
                {
                  backgroundColor: participate === "Female" ? "green" : "white",
                },
              ]}
              onPress={() => {
                setparticipate("Female")
              }}
            >
              <Text
                style={{
                  fontFamily: "OpanSans",
                  color: participate === "Female" ? "white" : "black",
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
                  backgroundColor: mode === "Paid" ? "green" : "white",
                },
              ]}
              onPress={() => {
                setMode("Paid")
              }}
            >
              <Text
                style={{
                  fontFamily: "OpanSans",
                  color: mode === "Paid" ? "white" : "black",
                }}
              >
                Paid
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.btn,
                {
                  backgroundColor: mode === "Free" ? "green" : "white",
                },
              ]}
              onPress={() => {
                setMode("Free")
              }}
            >
              <Text
                style={{
                  fontFamily: "OpanSans",
                  color: mode === "Free" ? "white" : "black",
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
            textAlign: "center",
            bottom: 2,
          }}
          onPress={() => {
            navigation.navigate("Fourth", {
              eventTitle: eventTitle,
              Name: Name,
              date: date,

              mode: mode.trim(),
              skill: skill.trim(),
              participate: participate.trim(),
            })
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
})
