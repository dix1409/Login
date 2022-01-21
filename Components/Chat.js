import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import chatting from "./Chat/ChatTop"
import chats from "./Chat/Chats"

import join from "./Chat/joinEvents"
const Stack = createStackNavigator()
export default function chat({ navigation }) {
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="chatting"
        component={chatting}
        options={() => ({
          title: "Chats",
          headerStyle: {
            backgroundColor: "white",
            borderBottomColor: "#f2f2f2",
            borderBottomWidth: 2,
            elevation: 20,
          },
          headerTitleStyle: {
            color: "#000",
          },
          headerTintColor: "white",
          headerLeftContainerStyle: {
            opacity: 0,
          },
          headerLeft: () => null,
        })}
      />

      <Stack.Screen
        name="chats"
        component={chats}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "black",
          },
          headerTintColor: "black",
          headerPressOpacity: 1,
        })}
      />
      <Stack.Screen
        name="join"
        component={join}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  )
}
