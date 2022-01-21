import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import profile from "./Profile/Profile"
import Edit from "./Profile/Edit"
import ProfileScreen from "./Profile/ProfileScreen"
import Info from "./Profile/Info"
const ProfileStack = createStackNavigator()
export default function MainProfile(props) {
  return (
    // <NavigationContainer independent={true}>
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ProfileScreen"
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="Edit" component={Edit} />
      <ProfileStack.Screen name="profile" component={profile} />
      <ProfileStack.Screen
        name="info"
        component={Info}
        options={{
          headerShown: true,
          headerTitle: "Personal Info",
          headerBackTitle: null,
        }}
      />
    </ProfileStack.Navigator>
    // </NavigationContainer>
  )
}
