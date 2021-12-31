import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import chat from "./Chat/Chatting"
import chats from "./Chat/Chats"
const Stack = createStackNavigator()
export default function join() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="chat" component={chats} />
        <Stack.Screen name="Giffty" component={chat} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
