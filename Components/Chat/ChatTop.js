import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()
import Join from "./Join"
import own from "./own"
export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Join" component={Join} />
      <Tab.Screen name="Own" component={own} />
    </Tab.Navigator>
  )
}
