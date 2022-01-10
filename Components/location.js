import React, { useEffect, useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  doc,
  setdoc,
  onSnapshot,
  collection,
  collectionGroup,
} from "firebase/firestore"
import { db, auth } from "./Event/Firestore"
export default function location(props) {
  const [loading, setloading] = useState(false)
  const [region, setregion] = useState([])
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [accuracy, setaccuracy] = useState("")
  const [email, setemail] = useState("")
  const [ready, setready] = useState(false)
  useEffect(() => {
    const emails = auth.currentUser.email ? auth.currentUser.email : "unknown"
    setemail(emails)
  })
  // console.log(email)

  useEffect(() => {
    if (email) {
      const locationref = doc(db, "user", email, "location", "doc")

      onSnapshot(locationref, (querySnapshot) => {
        let location = []

        location.push(querySnapshot.data())
        // console.log(querySnapshot.data())

        setregion([...location])
      })
      //  console.log(region)
    }
    setready(true)
  }, [email])
  useEffect(() => {
    if (ready) {
      if (latitude === "") {
        if (region.length > 0) {
          region.forEach((data) => {
            //  console.log(data.latitude)
            setlatitude(data.latitude)
            setaccuracy(data.accuracy)
          })
        }
      }
      if (longitude === "") {
        if (region.length > 0) {
          region.forEach((data) => {
            //  console.log(data.longitude)
            setlongitude(data.longitude)
          })
        }
      }
      if (longitude === "") {
        setloading(true)
      } else {
        //  console.log("yes")
        setloading(false)
      }
    }
  })

  // console.log()
  const oneDegreeOfLongitudeInMeters = 111.32 * 1000
  const circumference = (40075 / 360) * 1000

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.022,
            longitudeDelta: 0.021,
          }}
          provider={PROVIDER_GOOGLE}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={false}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
          ></Marker>
        </MapView>
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="gray" />
        </View>
      )}
      {/* <View
        style={{
          position: "absolute",
          marginTop: Platform.OS === "ios" ? 40 : 20,
          flexDirection: "row",
          backgroundColor: "#fff",
          width: "70%",
          alignSelf: "center",
          borderRadius: 5,
          padding: 10,
          shadowColor: "#ccc",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
        }}
      >
        <TextInput placeholder="search" style={{ flex: 1, padding: 0 }} />
      </View> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.9,
  },
})
