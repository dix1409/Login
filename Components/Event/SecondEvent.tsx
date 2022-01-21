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
  Platform,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import DatePicker from "@react-native-community/datetimepicker"
import { useKeyboard } from "@react-native-community/hooks"
import { useFonts } from "expo-font"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SecondEvent({ navigation, route }) {
  const [error, seterror] = useState("")
  const [eventTitle, setTitle] = useState("")
  const [Name, setName] = useState("")
  const [Dates, setDate] = useState("")
  const [show, setshow] = useState(false)
  const [select, setselect] = useState("Hockey")
  const [hour, sethour] = useState("")
  const [minute, setminute] = useState("")
  const [timeshow, settimeshow] = useState(false)
  const [marginBottom, setMarginBottom] = useState(0)
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const keyboard = useKeyboard()
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
  useEffect(() => {
    if (!keyboard.keyboardShown) {
      setMarginBottom(0)
    }
  }, [keyboard.keyboardShown])

  const shown = () => {
    setshow(!show)
  }
  // const shownTime = () => {
  //   settimeshow(!timeshow)
  // }
  // const onChangeTime = (event, selectedTime) => {
  //   if (selectedTime) {
  //     sethour(
  //       selectedTime.getHours() < 10
  //         ? `0${selectedTime.getHours()}`
  //         : selectedTime.getHours()
  //     )
  //     setminute(
  //       selectedTime.getMinutes() < 10
  //         ? `0${selectedTime.getMinutes()}`
  //         : selectedTime.getMinutes()
  //     )
  //     if (hour && minute) {
  //       console.log(hour)
  //       settimeshow(false)
  //     }
  //   }
  // }
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
    <SafeAreaView
      style={[
        styles.container,
        { paddingBottom: Platform.OS === "ios" ? marginBottom : 0 },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
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
                {/* <Picker
                  style={{ marginVertical: 10 }}
                  onValueChange={(val: string) => {
                    setTitle(val)
                  }}
                >
                  {sportname.map((s) => (
                    <Picker.Item label={s} value={s} key={s} />
                  ))}
                </Picker> */}
                <TextInput
                  style={styles.input}
                  onChangeText={(title) => setTitle(title)}
                  value={eventTitle}
                  placeholder="Type a Sport Name"
                />
              </View>
              <View style={{ marginTop: 32 }}>
                <Text style={styles.inputTitle}>Event Name</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Type an Event Name"
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
              <View style={{ marginTop: 32 }}>
                <Text style={styles.inputTitle}>Event Time</Text>
                {/* {timeshow && (
                  <DatePicker
                    style={styles.input}
                    mode="time"
                    is24Hour={true}
                    onTouchCancel={shownTime}
                    onChange={onChangeTime}
                    value={new Date()}
                  />
                )}
                {!timeshow && (
                  <TouchableOpacity onPress={shownTime}>
                    <View style={styles.input}>
                      {minute && hour ? (
                        <Text style={{ marginTop: 15 }}>
                          {hour}:{minute}
                        </Text>
                      ) : (
                        <Text style={{ marginTop: 15 }}> set time</Text>
                      )}
                      {/* <Text>{JSON.stringify(Date)}</Text> */}
                {/* </View>
                  </TouchableOpacity>
                )}  */}
                <TextInput
                  style={styles.input}
                  placeholder="Type an Event Time"
                  onChangeText={(time) => sethour(time)}
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
                backgroundColor: "#D0FF6C",
                borderRadius: 26,
                height: 52,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
                marginTop: 35,
              }}
              onPress={() => {
                navigation.navigate("Third", {
                  eventTitle: eventTitle.trim(),
                  Name: Name.trim(),
                  date: Dates.trim(),

                  hour: hour,
                })
              }}
            >
              <Text style={{ color: "black", fontFamily: "OpanSans" }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
    marginTop: 10,
  },
  headerContainer: {
    justifyContent: "flex-start",
  },
  greetingTitle: {
    fontSize: 20,
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
