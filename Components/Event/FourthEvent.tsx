import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import DatePicker from "@react-native-community/datetimepicker"
export default function FourthEvent({ route, navigation }) {
  const [participateCount, setparticipatecount] = useState(0)

  const [fees, setfees] = useState("")
  const [ispaid, setispaid] = useState(false)
  const [error, seterror] = useState("")
  const [Comment, setComment] = useState("")
  const [hour, sethour] = useState("")
  const [minute, setminute] = useState("")
  const eventTitle = route.params.eventTitle
  const name = route.params.Name
  const date = route.params.date
  const [show, setshow] = useState(false)

  const mode = route.params.mode
  const skill = route.params.skill
  const participate = route.params.participate
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  useEffect(() => {
    const paid = mode === "Paid" ? true : false

    setispaid(paid)
    return () => {
      paid
    }
  }, [])
  const Check = () => {
    if (participateCount === 0) {
      return 0
    } else if (hour === "") {
      return 0
    } else if (Comment === "") {
      return 0
    } else {
      return 1
    }
  }
  const shown = () => {
    setshow(!show)
  }
  // const datess = new Date()
  // const time = datess.getMinutes()
  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      sethour(selectedTime.getHours())
      setminute(selectedTime.getMinutes())
      shown()
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 0.7, marginLeft: 15 }}>
              <View style={styles.headerContainer}>
                <Text style={styles.greetingTitle}>Wanna Add Some Info?</Text>
              </View>

              <View style={styles.errorMessage}>
                {!!error && <Text style={styles.error}>{error}</Text>}
              </View>
              {ispaid && (
                <View style={styles.headerContainer}>
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
              <View style={styles.headerContainer}>
                <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
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

              {/* <View style={styles.headerContainer}>
                <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
                  Winning Prize
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setprize(text)
                  }}
                />
              </View> */}
              <View style={styles.headerContainer}>
                <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
                  Event Time
                </Text>
                {show && (
                  <DatePicker
                    style={styles.input}
                    mode="time"
                    is24Hour={true}
                    onTouchCancel={shown}
                    onChange={onChange}
                    value={new Date()}
                  />
                )}
                {!show && (
                  <TouchableOpacity onPress={shown}>
                    <View style={styles.input}>
                      {minute ? (
                        <Text style={{ marginTop: 15 }}>
                          {hour}:{minute}
                        </Text>
                      ) : (
                        <Text style={{ marginTop: 15 }}> set time</Text>
                      )}
                      {/* <Text>{JSON.stringify(Date)}</Text> */}
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.headerContainer}>
                <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
                  Eligiblity
                </Text>
              </View>
              <View style={styles.Input}>
                <TextInput
                  style={[
                    styles.inputTitle,
                    {
                      height: 100,
                      alignContent: "flex-start",
                      justifyContent: "flex-start",
                    },
                  ]}
                  multiline={true}
                  onChangeText={(text) => {
                    setComment(text)
                  }}
                />
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

                  bottom: 2,
                  marginTop: 32,
                }}
                onPress={() => {
                  Check()
                    ? navigation.navigate("Fifth", {
                        participateCount: participateCount,

                        fees: fees,
                        ispaid: ispaid,

                        comment: Comment,
                        eventTitle: eventTitle,
                        name: name,
                        date: date,
                        hours: hour,
                        minutes: minute,
                        mode: mode,
                        skill: skill,
                        participate: participate,
                      })
                    : seterror("Please Fill All Information")
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "OpanSans",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    // justifyContent: "flex-start",
    // alignItems: "center",
    marginTop: 32,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: "800",

    color: "#000",
    fontFamily: "OpanSans",
  },
  Input: {
    marginTop: 12,
    flex: 0.6,
    backgroundColor: "white",
    width: "80%",
    height: 100,
    // alignItems: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
