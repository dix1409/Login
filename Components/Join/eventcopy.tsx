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
import ExpoFastImage from "expo-fast-image"

import { useFonts } from "expo-font"
import { useTheme } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { MaterialIcons } from "@expo/vector-icons"
import { collection, onSnapshot } from "firebase/firestore"
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
    }
  }, [email])
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
        "https://s3-alpha-sig.figma.com/img/88da/0084/7c64f9051a63e64f154c2af8114843eb?Expires=1643587200&Signature=dPfmKxNmhQ7-HAcJ6ucsg1LUlZcrLU5MkgvFrkBU82FlVf5q6o~0r6rR7iTzPid2aqAWBpJQ6oFKTCRecvgD7z~xsUp9OoGoJN8941ecpUebqIsgBvD4esUWFksJkWc0goQ7qtWWoV7lgXV-8vO-D-zMZGDWWWrbv3vFVGw3wx1CyOJu6hLnbAFNzKX5FYsvmHp6UbAMZ9Vfq6leRR7mA9Xj9N76h22vIsNvBx1UYUGuPVM-jYHtfBhFxuynYRPyGOQwnbbDSJwlngemlrV8-lWbvl5wJOXzLXbGpJ9dYqkxAbwbBzzdOSsn1tGI-thyTFWvzPe3Cxs00qxqw4LK4w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
      Id: "2",
      Image:
        "https://s3-alpha-sig.figma.com/img/4fe2/1ae0/4692db84f94c28d13fd19558a8dac349?Expires=1643587200&Signature=SL4nYM6Kp3keq4pzLOLo0~VQiD71CMxJMgp8D59fBE7CeBEg~d88qqFPulMM7lSpSjLhBfACazbTTENY1dX577B0MLtrgs8aBG2e7dsT~S0~V3vIVdsnvNlm0IGiK-ri1tExHYtmvlG2GNZv89b2t~QoawR25xNiYqrESWFoiArP1ybmrVunFvkMtHXwlCpGW5cfG3m63oc7ADLJ0UnID1iWzFaxr0KOdHgmu1awJ6f3bqZgBFdCBQxTUNkZB~nTRq3VA8Wi4iHN1NA-FufFpszMrTrmzM-91M-5xBI4sExgmt5olQVmUazwxl7utwEcyMdTnIvCsW1T7ci5mEwbQA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
  ]

  const data = [
    {
      Id: "1",
      Image:
        "https://s3-alpha-sig.figma.com/img/a910/f353/d08f29c9b246b861e7ddc850d638214c?Expires=1643587200&Signature=F1dhB2wNYTsmOKaH7joq2-kg8y2dxB96Sn9LG2EGd0f7NzSPNXxLsDpwvYWnS-NvLKzFvLpcBZPQMcx-QWX~j0JUZresZLUQBQ3pD8TA6GAiH3eIJcutp0DHTlMxEG6S5H8XYqyEBTm6a2feR7x7IDopY6D2zWQK0pZSFrJU7aX-Xr2U1hbQnxdKqUnJQ6CUJWrzOUvuqUOJDyzY4rGrx1Uf8PqXpAPxLBB6o2onfzcM7cKU2kmW2qinuHjeNgTZ3pYh8IeWWr1lgxTBHegKlt~8h7cWyCdO~aB4ziUpaIZP7b93ffm1EZ3LWVMzSDVKycitVf6kg81eLmet5HpxxA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      titie: "Football",
    },

    {
      Id: "2",
      Image:
        "https://s3-alpha-sig.figma.com/img/ed89/4a82/c252d93c6b5146d4e209410255e07c7c?Expires=1643587200&Signature=hOw4Xs0x-TDyUVRPkhGQm8ko3d5iC4jprw0OhfSiKFoSSXMbouBZLuqhFil8NSs5S8Zs~EfKHES7J8tVuh8tjb79CAmtsl9SlRKAbmSZxLw1vCQK0zQNx63UxqIey4OGBakMPBEbgTpjtgG3Rvm9gKAXGn4VjND4hFl39ftw0D5q3Yow--~AmIsmKV7Ab0krgdQKOE6M1Z~vUH6s31Pb6lTKDSu4ijSBMre7ieyqQ0EhJ5LDhEqoscMmDchLJgpxdysJpdzXSoPbBrQ9TVjJDw~eSQkRPX7c9kNClmU5BO3~PSHhGRl~rVcIJmtumfz4LvVXXhAZEGU5vzSBhpvXRw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      titie: "Volleyball",
    },

    {
      Id: "3",
      Image:
        "https://s3-alpha-sig.figma.com/img/21cf/fc75/b9516a8c7ff95c265a5ad3c5aa300893?Expires=1643587200&Signature=A3yYxRBsS7xClO7e1Ldxd3WaWtaD6TuEjCJEd2IBpymJWNaa2d~QnsyEO7Y~EXrcWvs66QOQDM2irI2B6SdBsP2Dwcolq9pzNsS89CC4t3HBGMLGBz~MIwYk9TwydGxBhUM4BHlWuOA0YyTgGaA1ZyjgbE46VvaLs6pYt2rDa8nAzz3I944knHRwfrGc5mn2qqPoOpraNFTYuZr4-eHDznCpDwX6FetMRLsOrfJSnQZWVlCACkU3bpksT7WB~lImnTrSCXSPUTkh8sbPSQIlzwSFpjy~wxR7fSjRXyaw7NS1vKXLB91Q671JgUhkZYsuKGJDEuV27jfEv1oQ~aJirw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      titie: "Basketball",
    },
    {
      Id: "4",
      Image:
        "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fcricket-img.jpg?alt=media&token=5d9e73da-c8b7-45d3-b5e7-b4796a0176f2",
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
              uri: "https://s3-alpha-sig.figma.com/img/1cab/62b7/e4b0ebe5c116c3900693d3188458816f?Expires=1643587200&Signature=ARIFGDWxF6OZHDQx9n-UbUMbz1dlGkwbi1kv6UldTOy8eLhiMjwHjAlD2UTGjQUWHmkq8GqZsgsGyHJ2LfIgRZd2FHos8voifuC5jodsEgQe7kHuRe4HHNtA9J-T~oEBmBsdRs-ASlyJgU4WwDPQuY-zCrobQMZTXpM-5MD448fJwVLT4Rut4JRmS3twhrIhkFL1NJbOGdkgWKmAXgCCSs2tDfbFI8qDaDazjAoJDH3HNPCJuJDwZjZDObi4ABGKVV54ldRFZivMsdxBDFPlrKxjiND5bdVLsnKzdHOev65aM0EEadi5F8XycZICgiOuVdzWWcSyOenFICtJ1JW2TA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
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
                Good morning {username.length > 0 ? username : ""}! {"\n"}Today
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
              <ExpoFastImage
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fvolleyball-on-beach-2021-08-29-00-01-49-utc.jpg?alt=media&token=0510dd13-4acd-4ab8-b47f-c9b0bde1a7fc",
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
                  <ExpoFastImage
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
