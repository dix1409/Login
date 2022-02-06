import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { SafeAreaView } from "react-native-safe-area-context"

const { height } = Dimensions.get("screen")
import CalculateGeoHash from "../Event/GeoHash"
export default function FifthEvent({ route, navigation }) {
  const event = route.params.event
  const [visible, setvisible] = useState(false)
  const [vaild, setvalid] = useState(true)
  const [location, setlocation] = useState(event?.location)
  const [latitude, setlatitude] = useState(event?.latitude)
  const [longitude, setlongitude] = useState(event?.longitude)
  const [geoHash, setgeoHash] = useState(event?.geoHash)
  const eventTitle = route.params.eventTitle
  const Name = route.params.Name
  const Dates = route.params.Dates
  const hour = route.params.hour
  const minute = route.params.minute
  useEffect(() => {
    if (latitude > 0 && longitude > 0) {
      setgeoHash(CalculateGeoHash(latitude, longitude))
    }
  }, [latitude, longitude])
  const email = route.params.email
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ marginTop: 12 }}>
            <View style={{ height: height * 0.5, marginTop: 22 }}>
              <Text style={{ fontSize: 16, color: "black", marginVertical: 5 }}>
                Event Location
              </Text>

              <GooglePlacesAutocomplete
                placeholder="Set Location"
                onPress={(data, details = null) => {
                  setlocation(details.formatted_address)
                  setlatitude(details.geometry.location.lat)
                  setlongitude(details.geometry.location.lng)
                }}
                fetchDetails={true}
                keyboardShouldPersistTaps="always"
                nearbyPlacesAPI="GooglePlacesSearch"
                query={{
                  key: "AIzaSyCcN6s8ippd7mIFFE6tMcY8nFMffg83BuA",
                  language: "en",
                }}
                debounce={200}
                minLength={2}
                styles={{
                  container: {
                    width: "100%",
                  },
                  textInputContainer: {
                    borderBottomColor: "#8a8f9e",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  },
                }}
              />
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#D0FF6c",
                borderRadius: 26,
                height: 52,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",

                bottom: 2,
                marginBottom: 20,
              }}
              onPress={() => {
                navigation.navigate("EditEvent", {
                  location: location,
                  latitude: latitude,
                  email: email,
                  longitude: longitude,
                  geoHash: geoHash,
                  event: event,
                  Name: Name,
                  eventTitle: eventTitle,
                  minute: minute,
                  hour: hour,
                  Dates: Dates,
                })
              }}
            >
              <Text style={{ color: "black", fontFamily: "OpanSans" }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
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
  headerContainer: {
    // alignItems: "center",
    //justifyContent: "flex-start",
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
