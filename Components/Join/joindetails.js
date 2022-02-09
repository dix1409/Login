import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons"

import { useFonts } from "expo-font"

const { height } = Dimensions.get("window")
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

export default function joindetails({ navigation, route }) {
  const [size, setsize] = useState(height * 0.5)
  const [showScreen, setshowScreen] = useState(true)
  const [showsize, setshowsize] = useState(false)
  const event = route.params.item
  //console.log(event)
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  console.log(event)
  return (
    <View style={styles.container}>
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
            elevation: 30,
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
              latitude: event.latitude,
              longitude: event.longtitude || event.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <View style={{ borderRadius: 20 }}></View>
            <Marker
              coordinate={{
                latitude: event.latitude,
                longitude: event.longtitude || event.longitude,
              }}
              title={event.name}
            ></Marker>
          </MapView>

          <View
            style={{
              position: "absolute",
              marginTop: Platform.OS === "ios" ? 40 : 30,
              backgroundColor: "#fff",
              width: 50,
              height: 50,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 5,
            }}
          >
            {showScreen && (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <AntDesign name="arrowleft" size={24} color="#1b2534" />
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
                <AntDesign name="arrowleft" size={24} color="#1b2534" />
              </TouchableOpacity>
            )}
          </View>
          {/* <Modal transparent visible={visible}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "#fff",
                  paddingVertical: 30,
                  paddingHorizontal: 20,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: "100%",

                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setvisible(false)
                      }}
                    >
                      <Entypo name="cross" size={50} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="checkcircle" size={150} color="#2ecc71" />
                  </View>

                  <Text
                    style={{
                      alignItems: "center",
                      marginVertical: 30,
                      fontSize: 20,
                    }}
                  >
                    You Joined Successfully!.
                  </Text>
                </View>
              </View>
            </View>
          </Modal> */}
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={[styles.btnContainer, { backgroundColor: "black" }]}>
            <TouchableOpacity
              onPress={() => {
                setsize(height)
                setshowScreen(false)
                setshowsize(true)
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontFamily: "OpanSans" }}>
                View Full
              </Text>
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
          <Text
            style={{ fontSize: 20, color: "#080d17", fontFamily: "OpanSans" }}
          >
            {event.name}
          </Text>
          <View style={styles.BoxContainer}>
            <AntDesign name="clockcircle" size={18} color="#1b2534" />
            <Text style={[{ marginRight: 20 }, styles.textStyle]}>
              {event.hour}
            </Text>
            <FontAwesome name="calendar-times-o" size={18} color="#1b2534" />
            <Text style={styles.textStyle}>
              {event.date.split("-").reverse().join("-")}
            </Text>
          </View>
          <View style={styles.BoxContainer}>
            <Ionicons name="location-sharp" size={24} color="#1b2534" />
            <Text style={styles.textStyle}>
              {event.Location || event.location}
            </Text>
          </View>
          <View style={styles.BoxContainer}>
            <FontAwesome5 name="money-bill" size={24} color="#1b2534" />
            {event.fees.length > 0 && (
              <Text style={styles.textStyle}>
                Enternance Fee: {event.mode}: {event.fees}
              </Text>
            )}
            {event.fees.length === 0 && (
              <Text style={styles.textStyle}>Enternance Free 😍😍</Text>
            )}
          </View>
          {/* <View style={styles.BoxContainer}>
            <FontAwesome5 name="money-bill-wave" size={24} color="black" />
            <Text style={{ marginHorizontal: 10, color: "#c4c6ca" }}>
              Winning Prize:{event.prize}
            </Text>
          </View> */}
          <View style={styles.BoxContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="infocirlce" size={24} color="black" />
              <Text style={styles.textStyle}>Additional Comment</Text>
            </View>
          </View>
          <View style={styles.BoxContainer}>
            <Text style={styles.textStyle}>{event.comment}</Text>
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("third", { id: event.id })
              }}
              style={styles.btnContainer}
            >
              <Text style={{ color: "black", fontFamily: "OpanSans" }}>
                View participation's
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  BoxContainer: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    marginHorizontal: 10,
    color: "#c4c6ca",

    fontFamily: "OpanSans",
  },
  btnContainer: {
    backgroundColor: "#D0FF6C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    height: height * 0.07,
  },
})
