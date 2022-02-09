import React, { useState, useEffect, useLayoutEffect } from "react"
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
// import ExpoFastImage from "expo-fast-image"

import { useFonts } from "expo-font"
import { useTheme } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { MaterialIcons } from "@expo/vector-icons"
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { auth, db } from "../Event/Firestore"

const { height, width } = Dimensions.get("window")
export default function First({ navigation }) {
  const [serach, setserach] = useState("")
  const [name, setname] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()
  const [show, setshow] = useState(false)
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [event, setevent] = useState([])
  const [join, setjoin] = useState(false)

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
    if (email.length === 0) {
      console.log("go on...")
      if (auth.currentUser.email) {
        setemail(auth.currentUser.email)
      }
    }
  })
  const time = new Date().getTime()

  useEffect(() => {
    if (email) {
      const nameRef = collection(db, `user/${email}/profile`)

      const nameuser = onSnapshot(nameRef, (querySnapshot) => {
        let user = []
        querySnapshot.forEach((doc) => {
          user.push({ ...doc.data(), id: doc.id })
        })

        let userdata = Object.assign({}, ...user)
        if (userdata.firstname) {
          console.log("name: ", userdata.firstname)
          setusername(userdata.firstname)
        }
      })
      if (name.length > 0) {
        nameuser()
      }
      const userchatref = collection(db, `user/${email}/Ownevent`)

      onSnapshot(userchatref, (querySnapshot) => {
        if (querySnapshot.empty) {
          setshow(false)
        } else {
          setshow(true)
        }
      })
      const userjoinref = collection(db, `user/${email}/joinEvent`)
      onSnapshot(userjoinref, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("yess..")
          setjoin(false)
        } else {
          let eventTitle = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            eventTitle.push(doc.data())
          })
          setevent([...eventTitle])
          const checkRef = query(userjoinref, where("expiredAt", "<=", time))
          onSnapshot(checkRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data())
            })
          })
        }
      })
    }
  }, [email])
  useEffect(() => {
    console.log("nope..")
    if (event.length > 0) {
      setjoin(true)
    }
  }, [event])
  //console.log(dataCricket)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("fourth")
          }}
        >
          <FontAwesome
            name="search"
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 15,
            }}
            size={24}
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

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

  const challange = [
    {
      Id: "1",
      Image:
        "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643452859/Image/7c64f9051a63e64f154c2af8114843eb_l027qf.jpg",
    },
    {
      Id: "2",
      Image:
        "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643452924/Image/4692db84f94c28d13fd19558a8dac349_hqcwsl.jpg",
    },
  ]

  const data = [
    {
      Id: "1",
      Image:
        "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643453022/Image/d08f29c9b246b861e7ddc850d638214c_htx8h4.jpg",
      titie: "Football",
    },

    {
      Id: "2",
      Image:
        "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643453059/Image/c252d93c6b5146d4e209410255e07c7c_deoo0u.jpg",
      titie: "Volleyball",
    },

    {
      Id: "3",
      Image:
        "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643453098/Image/b9516a8c7ff95c265a5ad3c5aa300893_bfcnnh.png",
      titie: "Basketball",
    },
    {
      Id: "4",
      Image:
        "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643453129/Image/Image_2Fcricket-img_v5hwxj.jpg",
      titie: "Cricket",
    },
  ]

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground
            style={{
              width: "100%",
              height: 220,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={{
              uri: "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643435347/Image/first_ou3pse.png",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                margin: 5,
                alignItems: "center",
                maxWidth: "80%",
              }}
            >
              <Text style={{ fontSize: 24, color: "#f7f7f7" }}>
                Good morning {username.length > 0 ? username : ""} {"\n"}Today
                is a good day {"\n"}to try something new
              </Text>
              <TouchableOpacity
                style={{
                  width: 171,
                  backgroundColor: "#D0FF6C",
                  marginTop: 5,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",

                  // marginVertical: 15,
                }}
                onPress={() => navigation.navigate("Near")}
              >
                <Text
                  style={{
                    marginLeft: 1,
                    color: "#000",
                    textAlign: "center",
                    fontSize: 15,
                  }}
                >
                  DISCOVER
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {show && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginVertical: 15,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginVertical: 10,
                textAlign: "center",
                fontFamily: "OpanSans",
                fontWeight: "bold",
              }}
            >
              Your Event{" "}
            </Text>
            <TouchableOpacity
              style={{ height: 182, width: width }}
              onPress={() => navigation.navigate("ownEvent", { email: email })}
            >
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643641385/Image/Image_2Fvolleyball-on-beach-2021-08-29-00-01-49-utc_g2szy5-min_jzjkdn.jpg",
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>
        )}
        {join && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginVertical: 15,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginVertical: 10,
                textAlign: "center",
                fontFamily: "OpanSans",
                fontWeight: "bold",
              }}
            >
              join Event
            </Text>
            <TouchableOpacity
              style={{ height: 182, width: width }}
              onPress={() =>
                navigation.navigate("join", { event: event, email: email })
              }
            >
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643641385/Image/Image_2Fvolleyball-on-beach-2021-08-29-00-01-49-utc_g2szy5-min_jzjkdn.jpg",
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginVertical: 15,
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginVertical: 10,
              textAlign: "center",
              fontFamily: "OpanSans",
              fontWeight: "bold",
            }}
          >
            NearBy Event{" "}
          </Text>
          <TouchableOpacity
            style={{ height: 182, width: width }}
            onPress={() => navigation.navigate("Near By", { email: email })}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1643641385/Image/Image_2Fvolleyball-on-beach-2021-08-29-00-01-49-utc_g2szy5-min_jzjkdn.jpg",
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginVertical: 10,
              textAlign: "center",
              fontFamily: "OpanSans",
              fontWeight: "bold",
            }}
          >
            CHALLENGES
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
              data={challange}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item) => item.Id}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: width * 0.44,
                    height: 182,

                    backgroundColor: "#f7f7f7",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,

                    marginVertical: 15,
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: item.Image,
                    }}
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
              )}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginVertical: 10,
              textAlign: "center",
              fontFamily: "OpanSans",
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            SPORTS
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
              horizontal
              keyExtractor={(item) => item.Id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("fifth", {
                      title: item.titie,
                      email: email,
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
    backgroundColor: "#fff",
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
