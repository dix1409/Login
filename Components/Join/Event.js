import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from "react-native"

import { useFonts } from "expo-font"
import { useTheme } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { MaterialIcons } from "@expo/vector-icons"

const { height, width } = Dimensions.get("window")
export default function First({ navigation }) {
  const [serach, setserach] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()
  // const getData = () => {
  //   Inforef.get().then((querySnapshot) => {
  //     console.log("Total users: ", querySnapshot.size);

  //     querySnapshot.forEach((documentSnapshot) => {
  //       let Data = [];
  //       Data.push(documentSnapshot.data());
  //       setdata([...data, Data]);
  //     });
  //   });
  // };

  //console.log(dataCricket)

  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })

  if (!loaded) {
    return null
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }
  let today = new Date()
  let curHr = today.getHours()
  let wishes
  const TimeCheck = () => {
    if (curHr < 12) {
      wishes = "Good Morning"
    } else if (curHr < 17) {
      wishes = "Good Afternoon"
    } else {
      wishes = "Good Evening"
    }
    return wishes
  }
  const data = [
    {
      Id: 1,
      Image:
        "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fball-hitting-wicket-stumps_1302-15526.jpg?alt=media&token=b033b6f0-432b-4589-bcc2-9f8cc17b550d",
      titie: "Cricket",
    },
    {
      Id: 2,
      Image:
        "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fvolleyball-court-composition-outdoor-scenery-with-cityscape-team-players-with-net-sitting-referee-illustration_1284-57172.jpg?alt=media&token=cd3e443f-32e8-4fb7-8b5d-ae5029cc44a8",
      titie: "Volleyball",
    },
    {
      Id: 3,
      Image:
        "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Ftwo-soccer-player-stadium_151223-56.jpg?alt=media&token=c4b6fe49-c2d3-47b0-a1b3-97c0d7fcce52",
      titie: "Football",
    },
    {
      Id: 4,
      Image:
        "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fbadminton-2.png?alt=media&token=e7d34cc8-a850-4ddd-9b61-22fbdf4719b0",
      titie: "Badminton",
    },
  ]

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar style={{ backgroundColor: "#E5E1D9" }} />
        <View
          style={{
            marginTop: 5,
            marginBottom: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>👋heyy {TimeCheck()}</Text>
        </View>
        <View>
          <ImageBackground
            style={{ width: "100%", height: 200 }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2FRectangle.png?alt=media&token=557ce281-ead8-4d8f-b09d-c069829fde81",
            }}
            resizeMode="contain"
          >
            <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Text style={{ fontSize: 32, color: "#f7f7f7" }}>Explore </Text>
                <Text
                  style={{ fontSize: 32, color: "#f7f7f7", marginBottom: 15 }}
                >
                  New Event
                </Text>
                <TouchableOpacity
                  style={{
                    width: "80%",
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    height: 44,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",

                    // marginVertical: 15,
                  }}
                  onPress={() => navigation.navigate("Near")}
                >
                  <MaterialIcons name="event" size={20} color={"#9A9A9A"} />
                  <Text
                    style={{
                      marginLeft: 1,
                      color: "#9A9A9A",
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    Explore Event
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: "flex-end", width: "48%" }}>
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fimage-removebg-preview.png?alt=media&token=b04a3985-0f23-4ffc-bf5c-b9bb7a133110",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fffff",
            paddingBottom: 5,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "#ffff",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <FontAwesome
              name="search"
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 15,
              }}
              size={20}
            />
            <TextInput
              placeholder="Enter Sport Name"
              style={{
                height: 40,
                marginHorizontal: 10,

                flex: 1,
                borderRadius: 15,
              }}
              autoCapitalize="words"
              onChangeText={(val) => {
                setserach(val)
              }}
              onSubmitEditing={() => {
                navigation.navigate("fourth", {
                  value: serach.trim(),
                })
                setserach("")
              }}
              value={serach}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginVertical: 10,
              textAlign: "center",
              fontFamily: "OpanSans",
            }}
          >
            Recommended Event
          </Text>

          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              flexDirection: "row",
            }}
          >
            <FlatList
              data={data}
              numColumns={2}
              keyExtractor={(item) => item.Id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("fifth", {
                      title: item.titie,
                    })
                  }
                >
                  <View
                    style={{
                      width: width * 0.45,
                      height: width * 0.44,
                      marginHorizontal: 5,

                      backgroundColor: "#f7f7f7",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,

                      marginVertical: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        marginLeft: 3,
                        fontSize: 16,
                        fontFamily: "OpanSans",
                      }}
                    >
                      {item.titie}
                    </Text>
                    <Image
                      source={{ uri: item.Image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopWidth: 1,

                        overflow: "hidden",
                      }}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E1D9",
    padding: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "OpanSans",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
})
