import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import * as Location from "expo-location"
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout,
} from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"
import * as geofire from "geofire-common"
import { BottomSheet } from "react-native-btr"
import {
  orderBy,
  collection,
  query,
  startAt,
  endAt,
  getDocs,
} from "firebase/firestore"
import { db } from "./Event/Firestore"
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
export default function location({ navigation }) {
  const [loading, setloading] = useState(true)

  const [latitude, setlatitude] = useState<number>(0)
  const [longitude, setlongitude] = useState<number>(0)
  const [visible, setVisible] = useState(false)
  const [event, setevent] = useState([])

  const [eventshow, seteventshow] = useState({})

  useEffect(() => {
    askPermission()
  }, [])
  useEffect(() => {
    //console.log("")

    GetDATA()
  }, [latitude, longitude])
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible)
  }
  // console.log()

  const askPermission = async () => {
    setloading(true)
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status === "granted") {
      console.log(status)
      let { coords } = await Location.getCurrentPositionAsync()
      console.log(coords)
      if (coords) {
        let { latitude, longitude } = coords
        setlatitude(latitude)
        setlongitude(longitude)
        console.log(latitude, longitude)
        if (latitude) {
          setloading(false)
        }
      }
    }
  }
  function GetDATA() {
    let lat = latitude
    let lng = longitude
    const center = [lat, lng]
    const radiusInM = 20000
    const bounds = geofire.geohashQueryBounds(center, radiusInM)
    const promises = []
    const eventref = collection(db, "data")

    for (const b of bounds) {
      const q = query(eventref, orderBy("geoHash"), startAt(b[0]), endAt(b[1]))

      promises.push(getDocs(q))
    }
    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = []
        // console.log(snapshots)
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("latitude")
            const lng = doc.get("longitude")
            let lat1 = parseFloat(lat)
            let lng1 = parseFloat(lng)
            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat1, lng1], center)
            const distanceInM = distanceInKm * 1000
            if (distanceInM <= radiusInM) {
              matchingDocs.push({
                ...doc.data(),
                distance: distanceInKm,
                id: doc.id,
              })
            }
          }
        }
        // sort matchingDocs by distance
        matchingDocs.sort((a, b) => {
          return a.distance - b.distance
        })

        return matchingDocs
      })
      .then((matchingDocs) => {
        const stores = matchingDocs

        const FilterStores = stores

        setevent(FilterStores)
        setloading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!longitude || !latitude) {
    console.log(longitude)
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="red" size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView>
      {!loading && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.08,
            longitudeDelta: 0.081,
          }}
          key={"AIzaSyCcN6s8ippd7mIFFE6tMcY8nFMffg83BuA"}
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
              latitude: latitude,
              longitude: longitude,
            }}
            title="me"
          ></Marker>
          {event.length > 0 &&
            event.map((event) => {
              return (
                <Marker
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                  }}
                  title={event.eventTitle}
                  key={event.id}
                >
                  <Callout
                    tooltip
                    onPress={() => {
                      toggleBottomNavigationView()
                      seteventshow(event)
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          padding: 15,
                          borderWidth: 0.5,
                          backgroundColor: "#fff",
                          borderRadius: 6,
                          borderColor: "#ccc",
                          width: 150,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ marginRight: "auto" }}>
                            <Text>{event.eventTitle}</Text>
                            <Text>{event.name}</Text>
                          </View>
                          <View style={styles.image}>
                            <AntDesign
                              name="arrowright"
                              size={24}
                              color="black"
                            />
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          borderColor: "transparent",
                          backgroundColor: "transparent",
                          borderTopColor: "#0007a87",
                          borderWidth: 16,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: -0.5,
                          width: 15,
                        }}
                      />
                      <View
                        style={{
                          borderColor: "transparent",
                          backgroundColor: "transparent",
                          borderTopColor: "white",
                          borderWidth: 16,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: -32,
                        }}
                      />
                    </View>
                  </Callout>
                </Marker>
              )
            })}
        </MapView>
      )}
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: 300,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: "#777",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 24 }}>{eventshow.eventTitle}</Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: "#080d17",
                fontFamily: "OpanSans",
                marginVertical: 15,
              }}
            >
              Event Name: {eventshow.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="clockcircle" size={18} color="#1b2534" />
              <Text style={{ marginHorizontal: 10 }}>{eventshow.hour}</Text>
              <FontAwesome name="calendar-times-o" size={18} color="#1b2534" />
              <Text style={{ marginLeft: 10 }}>{eventshow.date}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
              <Ionicons name="location-sharp" size={24} color="#1b2534" />
              <Text style={{ maxWidth: "90%", marginLeft: 7 }}>
                {eventshow.location}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 20,
                width: "70%",
                backgroundColor: "#5CFE89",
                height: "100%",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("Explore", {
                  screen: "second",
                  params: { item: eventshow },
                }),
                  toggleBottomNavigationView()
              }}
            >
              <Text>Go To Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
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
  image: {
    borderColor: "#999",

    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
