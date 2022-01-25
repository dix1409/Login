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
  const time = new Date().getTime()
  useEffect(() => {
    const ref = query(
      EventRef,
      where("expiredAt", ">=", JSON.stringify(time)),
      orderBy("expiredAt", "desc")
    )
    onSnapshot(ref, (querySnapshot) => {
      let events = []
      querySnapshot.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id })
      })
      setevent([...events])
    })
  }, [])

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
