import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import chatting from "./Chat/Chatting"
import chats from "./Chat/Chats"
const Stack = createStackNavigator()
export default function join() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="chatting"
          component={chatting}
          options={() => ({
            title: "Events",
            headerStyle: {
              backgroundColor: "#FF6347",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "white",
            headerLeftContainerStyle: {
              opacity: 0,
            },
          })}
        />
        <Stack.Screen
          name="chats"
          component={chats}
          options={({ route }) => ({
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
