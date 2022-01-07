import React from "react"
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Event from "./Join/Event"
import JoinEvents from "./Join/joinEvent"
import Participate from "./Join/Participate"
import SearchResult from "./Join/SearchResult"
import ShowEvent from "./Join/ShowEvent"
const JoinEvent = createStackNavigator()
const Eventnavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <JoinEvent.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <JoinEvent.Screen name="first" component={Event} />
        <JoinEvent.Screen
          name="second"
          component={JoinEvents}
          options={{
            headerRight: (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
        <JoinEvent.Screen name="third" component={Participate} />
        <JoinEvent.Screen name="fourth" component={SearchResult} />
        <JoinEvent.Screen
          name="fifth"
          component={ShowEvent}
          options={({ route }) => ({
            headerShown: true,
            headerTitle: route.params.title,
            headerStyle: {
              backgroundColor: "#FF6347",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "white",
          })}
        />
      </JoinEvent.Navigator>
    </NavigationContainer>
  )
}

export default function Plus(props) {
  return (
    <NavigationContainer independent={true}>
      <Eventnavigation />
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  text: {
    fontSize: 20,
  },
})
