import React, { useState, useEffect } from "react"
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
} from "react-native"
import { useFonts } from "expo-font"
import * as Location from "expo-location"
import { SafeAreaView } from "react-native-safe-area-context"
import { useKeyboard } from "@react-native-community/hooks"
const { height, width } = Dimensions.get("window")
export default function ThirdScreen({ route, navigation }) {
  const [mode, setMode] = useState("")
  const [participate, setparticipate] = useState("")
  const [participateCount, setparticipatecount] = useState(0)
  const [fees, setfees] = useState("")
  const [ispaid, setispaid] = useState(false)
  const [skill, setskill] = useState("")
  const [error, seterror] = useState("")
  const [Comment, setComment] = useState("")
  const [marginBottom, setMarginBottom] = useState(0)
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  const hour = route.params.hour
  const keyboard = useKeyboard()
  const eventTitle = route.params.eventTitle
  const Name = route.params.Name
  const date = route.params.date
  console.log(hour)
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
              <>
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
              </>
            )}
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={[styles.greetingTitle, { fontSize: 14 }]}>
              Additional Comments
            </Text>
          </View>

          <TextInput
            style={[
              styles.inputTitle,
              {
                height: 100,
                alignContent: "flex-start",
                justifyContent: "flex-start",
                backgroundColor: "#f7f7f7",
                marginTop: 5,
              },
            ]}
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
                navigation.navigate("Fifth", {
                  eventTitle: eventTitle,
                  Name: Name,
                  date: date,

                  mode: mode.trim(),
                  skill: skill.trim(),
                  participate: participate.trim(),
                  fees: fees,

                  hour: hour,
                  participateCount: participateCount,
                  comment: Comment,
                })
              }}
            >
              <Text style={{ color: "black", fontFamily: "OpanSans" }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    width: "100%",
  },
})
