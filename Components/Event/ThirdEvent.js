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
export default function ThirdScreen({ route, navigation }) {
  const [mode, setMode] = useState("")
  const [participate, setparticipate] = useState("")
  const [skill, setskill] = useState("")

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  const eventTitle = route.params.eventTitle
  const Name = route.params.Name
  const Date = route.params.date
  const Location = route.params.Location
  console.log(eventTitle, Name, Date, Location)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greetingTitle}>Additional Details</Text>
      </View>
      <View style={styles.form}>
        <Text style={{ fontFamily: "OpanSans" }}>Skill Level</Text>
        <View style={{ marginTop: 15, flexDirection: "row" }}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
              styles.btn,
            ]}
            onPress={() => {
              setskill("Beginner")
            }}
          >
            <Text style={{ fontFamily: "OpanSans" }}>Beginner</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
              styles.btn,
            ]}
            onPress={() => {
              setskill("Intermidate")
            }}
          >
            <Text style={{ fontFamily: "OpanSans" }}>Intermediate</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
              styles.btn,
            ]}
            onPress={() => {
              setskill("Expert")
            }}
          >
            <Text style={{ fontFamily: "OpanSans" }}>Expert</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontFamily: "OpanSans" }}>Participants</Text>
          <View style={{ marginTop: 15, flexDirection: "row" }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.btn,
              ]}
              onPress={() => {
                setparticipate("Everyone")
              }}
            >
              <Text style={{ fontFamily: "OpanSans" }}>Everyone</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.btn,
              ]}
              onPress={() => {
                setparticipate("Male")
              }}
            >
              <Text style={{ fontFamily: "OpanSans" }}>Male</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.btn,
              ]}
              onPress={() => {
                setparticipate("Female")
              }}
            >
              <Text>Female</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontFamily: "OpanSans" }}>Mode</Text>
          <View style={{ marginTop: 15, flexDirection: "row" }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.btn,
              ]}
              onPress={() => {
                setMode("Paid")
              }}
            >
              <Text style={{ fontFamily: "OpanSans" }}>Paid</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.btn,
              ]}
              onPress={() => {
                setMode("Free")
              }}
            >
              <Text style={{ fontFamily: "OpanSans" }}>Free</Text>
            </Pressable>
          </View>
        </View>
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
              date: Date,
              Location: Location,
              mode: mode,
              skill: skill,
              participate: participate,
            })
          }}
        >
          <Text style={{ color: "white", fontFamily: "OpanSans" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
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
