import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Dimensions,
} from "react-native"

import DatePicker from "react-native-datepicker"
import PlacesInput from "react-native-places-input"
import { useFonts } from "expo-font"
import { SafeAreaView } from "react-native-safe-area-context"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
export default function SecondEvent({ navigation, route }) {
  const [error, seterror] = useState("")
  const [eventTitle, setTitle] = useState("")
  const [Name, setName] = useState("")
  const [Date, setDate] = useState("")

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  const Check = () => {
    if (eventTitle === "") {
      return 0
    }
    if (Name === "") {
      return 0
    }

    return 1
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.greetingTitle}>
                What are the Details of the Event?
              </Text>
            </View>
            <View
              style={styles.container}
              // behavior="position"
              // keyboardVerticalOffset={-550}
            >
              <View style={styles.form}>
                <View style={styles.errorMessage}>
                  {!!error && <Text style={styles.error}>{error}</Text>}
                </View>

                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Sport Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(title) => setTitle(title)}
                    value={eventTitle}
                  />
                </View>
                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Event Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(Name) => setName(Name)}
                  />
                </View>
                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Event Time</Text>
                  <DatePicker
                    style={styles.input}
                    mode="date"
                    format="DD/MM/YYYY"
                    minDate="01-01-2021"
                    maxDate="01-01-2050"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        right: -5,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        borderColor: "#000",
                        alignItems: "flex-start",
                        borderWidth: 0,
                        borderBottomWidth: 1,
                      },

                      dateText: {
                        fontSize: 17,
                      },
                    }}
                    onDateChange={(date) => {
                      setDate(date)
                    }}
                    date={Date}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
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
                  marginTop: 35,
                  textAlign: "center",
                }}
                onPress={() => {
                  Check()
                    ? navigation.navigate("Third", {
                        eventTitle: eventTitle.trim(),
                        Name: Name.trim(),
                        date: Date.trim(),
                      })
                    : seterror("Please Fill All The Details")
                }}
              >
                <Text style={{ color: "white", fontFamily: "OpanSans" }}>
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
    // justifyContent: "center",
    //
    width: "100%",
    marginTop: 10,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: "black",
    fontFamily: "OpanSans",
  },

  form: {
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  inputTitle: {
    color: "#000",
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily: "OpanSans",
  },
  input: {
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: "100%",
    fontSize: 15,
    color: "#161f3d",
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
