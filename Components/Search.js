import React from "react"

import { createStackNavigator } from "@react-navigation/stack"
import Event from "./Join/eventcopy"
import JoinEvents from "./Join/joinEvent"
import Participate from "./Join/Participate"
import SearchResult from "./Join/SearchResult"
import ShowEvent from "./Join/ShowEvent"
import ShowNearEvent from "./Join/ShowNearEvent"
import ownEvent from "./Join/Ownevent"
import deleteevent from "./Join/deleteevent"
import OwnerDetail from "./Join/OwnerDetail"
import EditEvent from "./Join/EditEvent"
import NearByEvent from "./Join/NearByEvent"
import SecondEdit from "./Join/SecondEdit"
import location from "./Join/location"
const JoinEvent = createStackNavigator()
const Eventnavigation = () => {
  return (
    <JoinEvent.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <JoinEvent.Screen
        name="first"
        component={Event}
        options={{
          headerShown: true,
          headerTitle: "Explore ",
          headerTitleStyle: {
            color: "black",
          },

          headerLeft: () => {
            null
          },
        }}
      />
      <JoinEvent.Screen name="second" component={JoinEvents} />
      <JoinEvent.Screen name="delete" component={deleteevent} />
      <JoinEvent.Screen
        name="ownEvent"
        component={ownEvent}
        options={{
          headerShown: true,
          headerTitle: "Your Event",
          headerTitleStyle: {
            color: "black",
          },
        }}
      />
      <JoinEvent.Screen
        name="Location"
        component={location}
        options={{
          headerShown: true,
          headerTitle: "Event Location",
          headerTitleStyle: {
            color: "black",
          },
        }}
      />
      <JoinEvent.Screen
        name="EditEvent"
        component={EditEvent}
        options={{
          headerShown: true,
          headerTitle: "Edit",
          headerTitleStyle: {
            color: "black",
          },
        }}
      />
      <JoinEvent.Screen
        name="SecondEdit"
        component={SecondEdit}
        options={{
          headerShown: true,
          headerTitle: "Edit",
          headerTitleStyle: {
            color: "black",
          },
        }}
      />

      <JoinEvent.Screen
        name="Near"
        component={ShowNearEvent}
        options={{
          headerShown: true,
          headerTitle: "Explore Event",
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
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "#000",
          },
          headerTintColor: "black",
        })}
      />
      <JoinEvent.Screen
        name="OwnerDetail"
        component={OwnerDetail}
        options={{
          headerShown: true,
          headerTitle: "Organizer Details",
          headerTitleStyle: {
            color: "black",
          },
        }}
      />
      <JoinEvent.Screen
        name="Near By"
        component={NearByEvent}
        options={{
          headerShown: true,
          headerTitle: "Events",
          headerTitleStyle: {
            color: "black",
          },
        }}
      />
    </JoinEvent.Navigator>
  )
}

export default function Plus(props) {
  return <Eventnavigation />
}
