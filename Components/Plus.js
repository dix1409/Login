import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import First from "./Event/FirstEvent";
import Second from "./Event/SecondEvent";
import Third from "./Event/ThirdEvent";
import Fourth from "./Event/FourthEvent";
const CreateEvent = createStackNavigator();
const Eventnavigation = () => {
  return (
    <CreateEvent.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CreateEvent.Screen name="First" component={First} />
      <CreateEvent.Screen name="Second" component={Second} />
      <CreateEvent.Screen name="Third" component={Third} />
      <CreateEvent.Screen name="Fourth" component={Fourth} />
    </CreateEvent.Navigator>
  );
};

export default function Plus(props) {
  return (
    <NavigationContainer independent={true}>
      <Eventnavigation />
    </NavigationContainer>
  );
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
});
