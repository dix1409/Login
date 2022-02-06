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
  Dimensions,
  Button,
} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import DatePicker from "@react-native-community/datetimepicker"
import { useKeyboard } from "@react-native-community/hooks"
import { useFonts } from "expo-font"
import { SafeAreaView } from "react-native-safe-area-context"
const { height } = Dimensions.get("window")

export default function EditEvent({ navigation, route }) {
  const event = route.params.event
  const email = route.params.email
  const [error, seterror] = useState("")
  const [eventTitle, setTitle] = useState(event?.eventTitle || Title)
  const [Name, setName] = useState(event?.name || eventName)
  const [Dates, setDate] = useState(event?.date || Dat)
  const [show, setshow] = useState(false)

  // const [select, setselect] = useState("Hockey")
  const [hour, sethour] = useState(event?.hour || hours)
  const [minute, setminute] = useState("" || minute)
  const [timeshow, settimeshow] = useState(false)
  const [marginBottom, setMarginBottom] = useState(0)

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  const location = route.params.location || event?.location
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
  const Title = route.params.eventTitle
  const eventName = route.params.Name
  const Dat = route.params.Dates
  const hours = route.params.hour
  const minutes = route.params.minute
  const latitude = route.params.latitude || event.latitude
  const longitude = route.params.longitude || event.longitude
  const geoHash = route.params.geoHash || event.geoHash
  //console.log(latitude)
  useEffect(() => {
    if (name) {
      setTitle(name)
    }
  }, [name])
  console.log(event)
  console.log(email)
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
  const shownTime = () => {
    settimeshow(!timeshow)
  }
  const onChangeTime = (selectedTime) => {
    console.log(selectedTime.getHours())

    sethour(
      selectedTime.getHours() < 10
        ? `0${selectedTime.getHours()}`
        : selectedTime.getHours()
    )
    setminute(
      selectedTime.getMinutes() < 10
        ? `0${selectedTime.getMinutes()}`
        : selectedTime.getMinutes()
    )

    console.log("yesss.")
    settimeshow(false)
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

              <View style={styles.view}>
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
              <View style={styles.view}>
                <Text style={styles.inputTitle}>Event Name</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Type an Event Name"
                  onChangeText={(Name) => setName(Name)}
                  value={Name}
                />
              </View>
              <View style={styles.view}>
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
                        <Text style={styles.text}>{Dates}</Text>
                      ) : (
                        <Text style={styles.text}> {Dates}</Text>
                      )}
                      {/* <Text>{JSON.stringify(Date)}</Text> */}
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.view}>
                <Text style={styles.inputTitle}>Event Time</Text>

                {/* <DatePicker
                  //   style={styles.input}
                  //   mode="time"
                  //   is24Hour={true}
                  //   onTouchCancel={shownTime}
                  //   onChange={onChangeTime}
                  //   value={new Date()}
                  // /> */}
                {timeshow && (
                  <DateTimePickerModal
                    mode="time"
                    isVisible={timeshow}
                    onConfirm={onChangeTime}
                    onCancel={() => shownTime()}
                  />
                )}

                {!timeshow && (
                  <TouchableOpacity onPress={shownTime}>
                    <View style={styles.input}>
                      {minute && hour ? (
                        <Text style={styles.text}>
                          {hour}:{minute}
                        </Text>
                      ) : (
                        <Text style={styles.text}> {hour}</Text>
                      )}
                      {/* <Text>{JSON.stringify(Date)}</Text> */}
                    </View>
                  </TouchableOpacity>
                )}
                {/* <TextInput
                  style={styles.input}
                  placeholder="Type an Event Time"
                  onChangeText={(time) => sethour(time)}
                /> */}
              </View>
              <View style={styles.view}>
                <Text style={styles.inputTitle}>Event Location</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    navigation.navigate("Location", {
                      event: event,
                      email: email,
                      eventTitle: eventTitle,
                      Name: Name,
                      Dates: Dates,
                      hour: hour,
                      minute: minute,
                    })
                  }}
                >
                  <Text style={styles.text}>{location}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",

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
                    Check()
                      ? navigation.navigate("SecondEdit", {
                          eventTitle: eventTitle.trim(),
                          Name: Name.trim(),
                          date: Dates.trim(),
                          latitude: latitude,
                          longitude: longitude,
                          geoHash: geoHash,
                          location: location.trim(),
                          hour: `${hour}:${minute}`,
                          event: event,
                          email: email,
                        })
                      : seterror("Please Fill all Details")
                  }}
                >
                  <Text style={{ color: "black", fontFamily: "OpanSans" }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
    height: height,
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
  view: {
    marginTop: 32,
  },
  text: {
    marginTop: 15,
  },
})
