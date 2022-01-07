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
//import { TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

export default function FourthEvent({ route, navigation }) {
  const [participateCount, setparticipatecount] = useState(0)
  const [prize, setprize] = useState("")
  const [eventTime, seteventTime] = useState("")
  const [fees, setfees] = useState("")
  const [ispaid, setispaid] = useState(false)
  const [error, seterror] = useState("")
  const [Comment, setComment] = useState("")
  const eventTitle = route.params.eventTitle
  const name = route.params.Name
  const date = route.params.date

  const mode = route.params.mode
  const skill = route.params.skill
  const participate = route.params.participate
  useEffect(() => {
    const paid = mode === "Paid" ? true : false

    setispaid(paid)
    return () => {
      paid
    }
  }, [])
  const Check = () => {
    if (prize === 0 || prize === null || prize === "") {
      return 0
    }
    if (participateCount === 0) {
      return 0
    }

    return 1
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
          <ScrollView style={{ flex: 1, marginLeft: 10 }}>
            <View style={{ flex: 0.7 }}>
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
                    setparticipatecount(text)
                  }}
                />
              </View>

              <View style={styles.headerContainer}>
                <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
                  Winning Prize
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setprize(text)
                  }}
                />
              </View>
              <View style={styles.headerContainer}>
                <Text style={[styles.greetingTitle, { fontSize: 16 }]}>
                  Event Time
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    seteventTime(text)
                  }}
                />
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
                  textAlign: "center",
                  bottom: 2,
                  marginTop: 32,
                }}
                onPress={() => {
                  Check()
                    ? navigation.navigate("Fifth", {
                        participateCount: participateCount,
                        prize: prize,

                        fees: fees,
                        ispaid: ispaid,

                        comment: Comment,
                        eventTitle: eventTitle,
                        name: name,
                        date: date,
                        time: eventTime,
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
