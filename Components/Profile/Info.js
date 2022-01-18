import React from "react"
import { ScrollView, StatusBar, TouchableOpacity } from "react-native"
import { StyleSheet, View, Text, Dimensions } from "react-native"
import { useFonts } from "expo-font"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { useTheme } from "react-native-paper"

import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons"

const { height, width } = Dimensions.get("window")

export default function Info({ navigation, route }) {
  const { colors } = useTheme()
  const userinfo = route.params.userProfile

  const email = route.params.email
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  })
  console.log(userinfo)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />

      <View style={styles.bgImage}>
        <View
          style={{
            alignItems: "center",

            height: height * 0.15,
            marginHorizontal: 15,
            overflow: "hidden",
            flexDirection: "row",
            width: width,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "OpanSans",
              color: "#000",
              fontFamily: "OpanSans",

              marginStart: 10,
            }}
          >
            Personal Info
          </Text>
        </View>

        <View
          style={{
            height: height * 0.75,
            backgroundColor: "#fff",

            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            width: width,
          }}
        >
          <ScrollView
            style={{ width: "100%", height: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={styles.btnContainer}>
              <View style={styles.box}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
                <Text style={styles.item}>
                  Full Name :{userinfo.firstname} {userinfo.lastname}
                </Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.box}>
                <Feather name="phone" color={colors.text} size={20} />
                <Text style={styles.item}>PhoneNumber: {userinfo.phone}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.box}>
                <Icon name="map-marker-outline" color={colors.text} size={20} />
                <Text style={styles.item}>City : {userinfo.city}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.box}>
                <FontAwesome name="globe" color={colors.text} size={20} />
                <Text style={styles.item}>Country : {userinfo.country}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View>
        <View
          style={{
            alignItems: "center",
            marginTop: height * 0.75,
            width: width,
          }}
        >
          <View
            style={{
              width: "80%",
              height: 40,
              borderColor: "black",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("Edit", {
                  Profile: userinfo,
                  email: email,
                })
              }}
            >
              <AntDesign name="plus" size={22} color="black" />
              <Text
                style={{
                  textAlign: "center",
                  marginStart: 10,
                  fontFamily: "OpanSans",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  action: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  btnContainer: {
    height: 35,
    width: "90%",
    marginTop: 25,

    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  box: {
    width: "95%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginStart: 10,
  },
  item: {
    fontSize: 20,
    marginStart: 10,
    color: "#000",
    marginRight: "auto",
    fontFamily: "OpanSans",
  },
})
