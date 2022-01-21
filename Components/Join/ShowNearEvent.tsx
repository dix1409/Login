import React, { useEffect, useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import * as geofire from "geofire-common"
import { db } from "../Event/Firestore"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons"
import { useFonts } from "expo-font"
import LottieView from "lottie-react-native"
import * as Location from "expo-location"
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  where,
  limit,
  getDocs,
  startAt,
  endAt,
} from "firebase/firestore"
const EventRef = collection(db, "data")
export default function ShowNearEvent({ navigation, route }) {
  const [event, setevent] = useState([])
  const [show, setshow] = useState(true)
  const [load, setload] = useState(true)

  const [latitude, setlatitude] = useState(0)
  const [longitude, setlongitude] = useState(0)

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  useEffect(() => {
    // const ref = query(EventRef, orderBy("date", "desc"))
    onSnapshot(EventRef, (querySnapshot) => {
      let events = []
      querySnapshot.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id })
      })
      setevent([...events])
    })
  }, [])
  // useEffect(() => {
  //   if (latitude === 0) {
  //     askPermission()
  //   }
  // }, [])
  // useEffect(() => {
  //   if (latitude !== 0) {
  //     //console.log("")
  //     GetDATA()
  //   }
  // }, [latitude, longitude])
  // // console.log()
  // const askPermission = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync()
  //   if (status === "granted") {
  //     let { coords } = await Location.getCurrentPositionAsync()
  //     console.log(coords)
  //     if (coords) {
  //       let { latitude, longitude } = coords
  //       setlatitude(latitude)
  //       setlongitude(longitude)
  //       console.log(latitude, longitude)
  //     }
  //   }
  // }
  // function GetDATA() {
  //   let lat = latitude
  //   let lng = longitude
  //   const center = [lat, lng]
  //   const radiusInM = 20000
  //   const bounds = geofire.geohashQueryBounds(center, radiusInM)
  //   const promises = []
  //   const eventref = collection(db, "data")

  //   for (const b of bounds) {
  //     const q = query(eventref, orderBy("geoHash"), startAt(b[0]), endAt(b[1]))

  //     promises.push(getDocs(q))
  //   }
  //   // Collect all the query results together into a single list
  //   Promise.all(promises)
  //     .then((snapshots) => {
  //       const matchingDocs = []
  //       // console.log(snapshots)
  //       for (const snap of snapshots) {
  //         for (const doc of snap.docs) {
  //           const lat = doc.get("latitude")
  //           const lng = doc.get("longitude")
  //           let lat1 = parseFloat(lat)
  //           let lng1 = parseFloat(lng)
  //           // We have to filter out a few false positives due to GeoHash
  //           // accuracy, but most will match
  //           const distanceInKm = geofire.distanceBetween([lat1, lng1], center)
  //           const distanceInM = distanceInKm * 1000
  //           if (distanceInM <= radiusInM) {
  //             matchingDocs.push({
  //               ...doc.data(),
  //               distance: distanceInKm,
  //               id: doc.id,
  //             })
  //           }
  //         }
  //       }
  //       // sort matchingDocs by distance
  //       matchingDocs.sort((a, b) => {
  //         return a.distance - b.distance
  //       })

  //       return matchingDocs
  //     })
  //     .then((matchingDocs) => {
  //       const stores = matchingDocs

  //       const FilterStores = stores

  //       setevent(FilterStores)
  //       console.log(FilterStores)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  useEffect(() => {
    if (event.length == 0) {
      console.log("yup")

      setload(false)
      setshow(false)
    } else {
      setload(false)
      setshow(true)
      console.log(event)
    }
  }, [event])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {show &&
          !load &&
          event.map((data) => (
            <View style={styles.box} key={data.id}>
              <View
                style={{
                  height: "100%",
                  marginRight: 20,
                  justifyContent: "center",
                }}
              >
                {/* <Image
                style={styles.image}
                source={{
                  uri:
                    data.owner.image ||
                    "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fuser.png?alt=media&token=ff0f0135-7005-41c4-b448-02a08d428789",
                }}
              /> */}
              </View>
              <View style={{ justifyContent: "center", marginRight: "auto" }}>
                <Text style={{ fontFamily: "OpanSans" }}>{data.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="clock"
                    size={15}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ marginRight: 10, fontFamily: "OpanSans" }}>
                    {data.date}
                  </Text>
                  <Text>{data.time}</Text>
                </View>
                {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <MaterialIcons
                  name="monetization-on"
                  size={15}
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ fontFamily: "OpanSans" }}>{data.prize} Rs.</Text>
              </View> */}
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("second", { item: data })}
                >
                  <View
                    style={[
                      styles.image,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <AntDesign name="arrowright" size={30} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        {!show && !load && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <MaterialCommunityIcons
              name="cog-clockwise"
              size={100}
              style={{ color: "gray" }}
            />
            <Text style={{ color: "gray", fontSize: 25 }}>No Records</Text>
          </View>
        )}
        {load && <ActivityIndicator color="red" />}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginVertical: 10,
    height: 100,
    backgroundColor: "#ffff",
    flexDirection: "row",
  },
  image: {
    marginVertical: 10,
    borderColor: "#999",
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
})
