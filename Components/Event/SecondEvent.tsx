import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import DatePicker from "@react-native-community/datetimepicker"

import { useFonts } from "expo-font"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SecondEvent({ navigation, route }) {
  const [error, seterror] = useState("")
  const [eventTitle, setTitle] = useState("")
  const [Name, setName] = useState("")
  const [Dates, setDate] = useState("")
  const [show, setshow] = useState(false)
  const [select, setselect] = useState("Hockey")
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const [sportname] = useState([
    "Hockey",
    "Kabaddi",
    "Volleyball",
    "Golf",
    "Baseball",
    "Basketball",
    "Soccer",
    "Running",
  ])
  const name = route.params.name
  useEffect(() => {
    if (name) {
      setTitle(name)
    }
  }, [name])

  const Check = () => {
    if (eventTitle === "" || Name === "" || Dates === "") {
      return 0
    }

    return 1
  }

  const shown = () => {
    setshow(!show)
  }
  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate
      const date = JSON.stringify(currentDate)
      setDate(date.slice(1, 11))
      console.log(date.slice(1, 11))

      setshow(false)
    }
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
            <View style={styles.container}>
              <View style={styles.form}>
                <View style={styles.errorMessage}>
                  {!!error && <Text style={styles.error}>{error}</Text>}
                </View>

                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Sport Name</Text>
                  <Picker
                    style={{ marginVertical: 10 }}
                    onValueChange={(val: string) => {
                      setTitle(val)
                    }}
                  >
                    {sportname.map((s) => (
                      <Picker.Item label={s} value={s} />
                    ))}
                  </Picker>
                  <TextInput
                    style={styles.input}
                    onChangeText={(title) => setTitle(title)}
                    value={eventTitle}
                    placeholder="Select your favorite sport or Type Manually"
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
                  <Text style={styles.inputTitle}>Event Date</Text>
                  {show && (
                    <DatePicker
                      style={styles.input}
                      mode="date"
                      is24Hour={true}
                      onTouchCancel={shown}
                      onChange={onChange}
                      value={new Date()}
                    />
                  )}
                  {!show && (
                    <TouchableOpacity onPress={shown}>
                      <View style={styles.input}>
                        {Dates ? (
                          <Text style={{ marginTop: 15 }}>{Dates}</Text>
                        ) : (
                          <Text style={{ marginTop: 15 }}> select a date</Text>
                        )}
                        {/* <Text>{JSON.stringify(Date)}</Text> */}
                      </View>
                    </TouchableOpacity>
                  )}
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
                }}
                onPress={() => {
                  Check()
                    ? navigation.navigate("Third", {
                        eventTitle: eventTitle.trim(),
                        Name: Name.trim(),
                        date: Dates.trim(),
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
