import React, { useState } from "react"
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import styles from "./style"

const { width, height } = Dimensions.get("window")



const COLORS = { primary: "#1F9790", white: "#fff" }
const slides = [
  {
    id: "1",
    image: require("../Photo/rafiki.png"),
    title: "Create Sport Event",
    subtitle:
      "Create a Private event for your friends or share for public in your area to have pepole join",
  },
  {
    id: "2",
    image: require("../Photo/rafiki1.png"),
    title: "Join AN Activity",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    image: require("../Photo/rafiki2.png"),
    title: "Share With Your Network",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={item?.image}
        style={{ height: "70%", width, resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <View>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    </View>
  )
}
const Footer = () => {
  return (
    <View
      style={{
        height: height * 0.25,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      {/* Indicator container */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {/* Render indicator */}
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: "#34CA00",
              },
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex == slides.length - 1 ? (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.white,
                  borderWidth: 1,
                  backgroundColor: "transparent",
                },
              ]}
              onPress={skip}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#34CA00",
                }}
              >
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToNextSlide}
              style={styles.btn}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#34CA00",
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}
const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  const ref:any = React.useRef()
  const updateCurrentSlideIndex = (e: { nativeEvent: { contentOffset: { x: number} } }) => {
    const contentOffsetX:number = e.nativeEvent.contentOffset.x
    const currentIndex:number = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width
      if(ref?.current?.scrollToOffset){
      ref.current.scrollToOffset({ offset })
      setCurrentSlideIndex(currentSlideIndex + 1)
      }
    }
  }

  const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current.scrollToOffset({ offset })
    setCurrentSlideIndex(lastSlideIndex)
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        pagingEnabled
      />
      <Footer />
    </SafeAreaView>
  )
}


export default OnboardingScreen
