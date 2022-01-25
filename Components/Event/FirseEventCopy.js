import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function FirseEventCopy({ navigation }) {
  const [Title, setTitle] = useState("")

  const slide = [
    { id: 1, title: "Table Tennis", subTitle: "🏓 " },
    { id: 2, title: "Tennis", subTitle: "🎾 " },
    { id: 3, title: "Football", subTitle: "⚽ " },
    { id: 4, title: "Boxing", subTitle: "🥊 " },
    { id: 5, title: "Volleyball", subTitle: "🏐 " },
    { id: 5, title: "Basketball", subTitle: "🏀 " },
  ]
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: 20 }}>
          <ImageBackground
            style={{ width: "100%", height: 200 }}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/e-tuts.appspot.com/o/Image%2Fsecond-min.jpg?alt=media&token=5770d852-efae-46f0-b95b-aed94976bdd8",
            }}
            resizeMode="cover"
          >
            <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
              <View
                style={{
                  justifyContent: "center",
                  margin: 5,
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* <Text
                  style={{
                    fontSize: 28,
                    color: "#f7f7f7",
                    fontFamily: "OpanSans",
                  }}
                >
                  Create A {"\n"}Sport Event
                </Text> */}
                <TouchableOpacity
                  style={{
                    width: "50%",
                    backgroundColor: "#D0FF6C",
                    borderRadius: 12,
                    height: 44,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 130,

                    // marginVertical: 15,
                  }}
                  onPress={() => {
                    navigation.navigate("Second", { name: "" })
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={20}
                    color={"#000"}
                  />
                  <Text
                    style={{
                      marginLeft: 1,
                      color: "#000",
                      textAlign: "center",
                    }}
                  >
                    Create Event
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            marginTop: 40,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              maxWidth: "70%",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            What event do you want to create?
          </Text>
          <FlatList
            data={slide}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: 172,
                  height: 44,
                  backgroundColor: item.title === Title ? "#D0FF6C" : "#ffff",
                  marginLeft: 5,

                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  borderRadius: 26,
                  borderColor: "#333",
                  borderWidth: 1,
                }}
                onPress={() => {
                  setTitle(item.title)
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>{item.subTitle}</Text>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                marginBottom: 15,
                width: 172,
                height: 44,
                backgroundColor: "#D0FF6C",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 56,
              }}
              onPress={() => {
                navigation.navigate("Second", {
                  name: Title,
                })
              }}
            >
              <Text style={{ color: "black", fontSize: 20 }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
})
