import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import First from "./Event/FirseEventCopy"
import Second from "./Event/SecondEvent"
import Third from "./Event/ThirdEvent"
import Fourth from "./Event/FourthEvent"
import Fifth from "./Event/FifthEvent"
import Location from "./Event/Location"
const CreateEvent = createStackNavigator()
const Eventnavigation = () => {
  return (
    <CreateEvent.Navigator
      screenOptions={{
        headerTitle: "Create",
      }}
    >
      <CreateEvent.Screen
        name="First"
        component={First}
        options={{
          headerLeft: () => null,
        }}
      />
      <CreateEvent.Screen name="Second" component={Second} />
      <CreateEvent.Screen name="Third" component={Third} />
      <CreateEvent.Screen name="Fourth" component={Fourth} />
      <CreateEvent.Screen name="Fifth" component={Fifth} />
      <CreateEvent.Screen name="Location" component={Location} />
    </CreateEvent.Navigator>
  )
}

export default function Plus(props) {
  return (
    // <NavigationContainer independent={true}>
    <Eventnavigation />
    // </NavigationContainer>
  )
}
