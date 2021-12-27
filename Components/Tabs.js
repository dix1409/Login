import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";
import location from "./location";
import Chat from "./Chat";
import Plus from "./Plus";
import Profile from "./Profile";
import Search from "./Search";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
      style={{
        bottom: 0,
      }}
    >
      <Tab.Screen
        name="Map"
        component={location}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="map-marker"
                size={25}
                color={focused ? "#000" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="magnify"
                size={25}
                color={focused ? "#000" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={Plus}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="plus-circle"
                size={25}
                color={focused ? "#000" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="forum"
                size={25}
                color={focused ? "#000" : "gray"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                size={25}
                color={focused ? "#000" : "gray"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
