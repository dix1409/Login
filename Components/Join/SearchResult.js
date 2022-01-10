import React, { useState, useEffect } from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native"
import { db } from "../Event/Firestore"
import { onSnapshot, where, orderBy, doc, query } from "firebase/firestore"

export default function SearchResult({ navigation, route }) {
  const [serchResult, setserchResult] = useState([])
  const [count, setcount] = useState("")
  const value = route.params.value
  useEffect(() => {
    const Eventref = doc(collection(db, "data"))
    const ref = query(
      Eventref,
      where("eventTitle", "==", value),
      orderBy("date", "desc")
    )
    onSnapshot(ref, (querySnapshot) => {
      setcount(querySnapshot.size)
      const Search = []
      querySnapshot.forEach((doc) => {
        Search.push({ ...doc.data(), id: doc.id })
      })
      setserchResult([...Search])
    })
  }, [])
  // console.log(serchResult)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          You Searched :<Text style={styles.Searchtitle}> {value}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: "center",
            backgroundColor: "#55BCF6",
            alignItems: "center",
            width: 60,
            height: 30,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#000", fontSize: 18 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#55BCF6",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 18, color: "#3B3A39" }}>Your Result</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16 }}>
          Total Result Found :<Text style={{ color: "#102ba2" }}>{count}</Text>
        </Text>
      </View>
      <FlatList
        data={serchResult}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate("second", { item: item })
              }}
            >
              <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <View style={styles.circular}></View>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 15 },
  titleContainer: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 19,
    marginRight: "auto",
  },
  Searchtitle: {
    color: "#102ba2",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
})