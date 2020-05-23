import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";


import AddDeckPage from "./Pages/AddDeckPage/AddDeckPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { DecksStackScreen } from "./Screens/DecksScreen";
import { AddDecksStackScreen } from "./Screens/AddDeckScreen";
import {setLocalNotification} from './Data';
export default function App() {
  const Tab = createBottomTabNavigator();
React.useEffect(()=>{
setLocalNotification()
},[])
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Decks") {
              iconName = focused ? "cards" : "cards-outline";
            } else if (route.name === "Add-Deck") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            }

            // You can return any component that you like here!
            if (route.name === "Decks")
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            else return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Decks"
          component={DecksStackScreen}

        />
        <Tab.Screen name="Add-Deck" component={AddDecksStackScreen} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
