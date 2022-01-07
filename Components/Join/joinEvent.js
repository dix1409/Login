import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import {
  AntDesign,
  FontAwesome,
  EvilIcons,
  FontAwesome5,
} from "@expo/vector-icons"

import firebase from "firebase/compat/app"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { db } from "../Event/Firestore"
import { Pressable } from "react-native"
const { height, width } = Dimensions.get("screen")
const Mapstyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
]
export default function joinEvent({ navigation, route }) {
  const [userdata, setuserdata] = useState([])
  const [join, setjoin] = useState(false)
  const [size, setsize] = useState(height * 0.5)
  const [showScreen, setshowScreen] = useState(true)
  const [showsize, setshowsize] = useState(false)
  const event = route.params.item
  const auth = firebase.auth().currentUser.email
  useEffect(() => {
    db.collection("user")
      .where("userEmail", "==", auth)
      .onSnapshot((querySnapshot) => {
        let user = []
        querySnapshot.forEach((doc) => {
          user.push(doc.data())
        })
        setuserdata([...user])
      })
  }, [])
  console.log(userdata)
  let userinfo = []
  userdata.forEach((data) => {
    userinfo = data
  })
  // console.log(userinfo)

  // console.log(event)
  // console.log(auth)
  const joinEvents = () => {
    db.collection("event")
      .doc(event.id)
      .collection("participate")
      .add({
        username: userinfo.username,
        userEmail: userinfo.userEmail,
        userPassword: userinfo.userPassword,
      })
      .then(() => {
        Alert.alert("data added")
      })
    db.collection("user").doc(auth).collection("joinEvent").add({
      name: event.name,
      Location: event.Location,
      mode: event.mode,
      eventTitle: event.eventTitle,
      skill: event.skill,
      participate: event.participate,
      Comment: event.Comment,
      date: event.date,
      count: event.count,
      time: event.time,
      prize: event.prize,
      fees: event.fees,
      id: event.id,
      lantitude: event.lantitude,
      longtitude: event.longtitude,
    })
    // console.log("hello")
  }
  const checkJoin = () => {
    db.collection("user")
      .doc(auth)
      .collection("joinEvent")
      .where("id", "==", event.id)
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot.size)
        if (querySnapshot.size === 1) {
          setjoin(true)
          // console.log(join)
        }
      })
  }
  checkJoin()

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#0e1626" barStyle="light-content" />
      <View
        style={{
          height: size,
          //borderWidth: 1,
          overflow: "hidden",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          shadowColor: "#ccc",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
          borderWidth: 2,
        }}
      >
        <MapView
          style={{
            flex: 1,
            borderRadius: 20,
            height: "100%",
            overflow: "hidden",
          }}
          customMapStyle={Mapstyle}
          provider={PROVIDER_GOOGLE}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsCompass={true}
          showsPointsOfInterest={false}
          region={{
            latitude: parseFloat(event.latitude),
            longitude: parseFloat(event.longitude),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <View style={{ borderRadius: 20 }}></View>
          <Marker
            coordinate={{
              latitude: parseFloat(event.latitude),
              longitude: parseFloat(event.longitude),
            }}
            title={event.name}
          ></Marker>
        </MapView>

        <View
          style={{
            position: "absolute",
            marginTop: Platform.OS === "ios" ? 40 : 20,
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showScreen && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          )}
          {showsize && (
            <TouchableOpacity
              onPress={() => {
                setsize(height * 0.5)
                setshowScreen(true)
                setshowsize(false)
              }}
              style={{
                flex: 1,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#ff6a28",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            marginVertical: 10,
            width: "80%",
            height: height * 0.07,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setsize(height)
              setshowScreen(false)
              setshowsize(true)
            }}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Text>View Full</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 20, color: "#080d17" }}>{event.name}</Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            alignItems: "center",
          }}
        >
          <AntDesign name="clockcircle" size={18} color="#4d5665" />
          <Text
            style={{ marginHorizontal: 10, color: "#c4c6ca", marginRight: 20 }}
          >
            {event.time}
          </Text>
          <FontAwesome name="calendar-times-o" size={18} color="#4d5665" />
          <Text style={{ marginHorizontal: 10, color: "#c4c6ca" }}>
            {event.date}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons name="location" size={24} color="#4d5665" />
          <Text style={{ marginHorizontal: 10, color: "#c4c6ca" }}>
            {event.location}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="money-bill" size={24} color="#4d5665" />
          {event.fees.length > 0 && (
            <Text style={{ marginHorizontal: 10, color: "#c4c6ca" }}>
              Enternance Fee: {event.mode}: {event.fees}
            </Text>
          )}
          {event.fees.length === 0 && (
            <Text style={{ marginHorizontal: 10, color: "#c4c6ca" }}>
              Enternance Free 😍😍
            </Text>
          )}
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            overflow: "hidden",
            flex: 1,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "80%",
              backgroundColor: "#ff6a28",
              height: height * 0.07,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
            onPress={joinEvents}
            disabled={join}
          >
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
        {join && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("third", { id: event.id })
            }}
          >
            <Text>View Participtons</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
})
