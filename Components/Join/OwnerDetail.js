import React from "react"
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native"

export default function OwnerDetail({ navigation, route }) {
  const detail = route.params.detail
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: detail.image,
            }}
            style={{ height: 100, width: 100 }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Organizer Name: {detail.firstname}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
