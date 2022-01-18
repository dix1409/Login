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
  TouchableOpacity,
  ViewPropTypes,
  Button,
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

import {
  orderBy,
  collection,
  query,
  startAt,
  endAt,
  getDocs,
} from "firebase/firestore"
import { db, auth } from "./Event/Firestore"
import { AntDesign } from "@expo/vector-icons"
export default function location({ navigation }) {
  const [loading, setloading] = useState(true)
  const [region, setregion] = useState([])
  const [latitude, setlatitude] = useState<number>(0)
  const [longitude, setlongitude] = useState<number>(0)

  const [event, setevent] = useState([])
  const [emails, setemails] = useState("")

  useEffect(() => {
    if (latitude === 0 && longitude === 0) askPermission()
  }, [])
  useEffect(() => {
    if (latitude !== 0) {
      //console.log("")
      if (event.length === 0) {
        GetDATA()
      }
    }
  }, [latitude, longitude])
  // console.log()
  const askPermission = async () => {
    setloading(true)
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status === "granted") {
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
    // Collect all the query results together into a single list
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
        console.log(FilterStores)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!longitude || !latitude) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Image
          source={require("../photoes/Radio-1s-200px.gif")}
          style={{ width: 200, height: 200 }}
        />
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
                    onPress={() =>
                      navigation.navigate("Explore", {
                        screen: "second",
                        params: { item: event },
                      })
                    }
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
