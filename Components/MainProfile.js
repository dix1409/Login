import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import profile from "./Profile/Profile"
import BottomSheet from "./Profile/BottomSheet"
const ProfileStack = createStackNavigator()
export default function MainProfile(props) {
  return (
    <NavigationContainer independent={true}>
      <ProfileStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ProfileStack.Screen name="profile" component={profile} />
        <ProfileStack.Screen name="BottomSheet" component={BottomSheet} />
      </ProfileStack.Navigator>
    </NavigationContainer>
  )
}
