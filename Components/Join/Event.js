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

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { QuerySnapshot } from "firebase/firestore"
// Required for side-effects
require("firebase/firestore")
const firebaseConfig = {
  apiKey: "AIzaSyBi8VDfQchDQJLJNQ_mQO4EqxjfDTIlHJM",
  authDomain: "e-tuts.firebaseapp.com",
  projectId: "e-tuts",
  storageBucket: "e-tuts.appspot.com",
  messagingSenderId: "257278662825",
  appId: "1:257278662825:web:93fd59b2bf6e34bacc71b8",
  measurementId: "G-WP121F1W02",
}
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)
const Inforef = db.collection("data")
const { height, width } = Dimensions.get("window")
export default function First({ navigation }) {
  const [serach, setserach] = useState("")
  const [dataCricket, setCricket] = useState([])
  const [dataFootball, setdataFootball] = useState([])
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

  useEffect(() => {
    setIsLoading(true)
    Inforef.orderBy("date")
      .limit(10)
      .onSnapshot((querySnapShot) => {
        let DataTemp = []
        querySnapShot.forEach((doc) => {
          DataTemp.push({ ...doc.data(), id: doc.id })
        })
        setCricket([...DataTemp])
      })
    if (dataCricket !== null) {
      setIsLoading(false)
    }
  }, [])
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
      Image: require("../../Photo/ball-hitting-wicket-stumps_1302-15526.jpg"),
      titie: "Cricket",
    },
    {
      Id: 2,
      Image: require("../../Photo/volleyball-court-composition-outdoor-scenery-with-cityscape-team-players-with-net-sitting-referee-illustration_1284-57172.jpg"),
      titie: "Volleyball",
    },
    {
      Id: 3,
      Image: require("../../Photo/two-soccer-player-stadium_151223-56.jpg"),
      titie: "Football",
    },
    {
      Id: 4,
      Image: require("../../Photo/badminton-2.png"),
      titie: "Badminton",
    },
  ]

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar style={{ backgroundColor: "#f7f7f7" }} />
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
            source={require("../../Photo/Rectangle.png")}
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
              </View>
              <View style={{ justifyContent: "flex-end", width: "50%" }}>
                <Image
                  source={require("../../Photo/image-removebg-preview.png")}
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
              }}
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
          {/* <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20 }}>There Is No Event Available</Text>
        </View> */}
          {/* <Text>Cricket</Text>
          <ScrollView
            horizontal
            style={{ marginVertical: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {dataCricket.map((item) => {
              return (
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                  key={item.eventTitle}
                  onPress={() => {
                    navigation.navigate("second", { item: item })
                  }}
                >
                  <View>
                    <Text>{item.eventTitle}</Text>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <Text>Football</Text>
          <ScrollView
            horizontal
            style={{ marginVertical: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {dataCricket.map((item) => {
              return (
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                  key={item.eventTitle}
                  onPress={() => {
                    navigation.navigate("second", { item: item })
                  }}
                >
                  <View>
                    <Text>{item.eventTitle}</Text>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>*/}
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
                        color: "red",
                        marginLeft: 3,
                        fontSize: 16,
                        fontFamily: "OpanSans",
                      }}
                    >
                      {item.titie}
                    </Text>
                    <Image
                      source={item.Image}
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
