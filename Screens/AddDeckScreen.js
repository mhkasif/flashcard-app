import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AddDeckPage from "../Pages/AddDeckPage/AddDeckPage";

const AddDecksStack = createStackNavigator();

export const AddDecksStackScreen = () => {
  return (
    <AddDecksStack.Navigator>
      <AddDecksStack.Screen
        options={{
          title: "Add-Deck",
          headerStyle: {
            backgroundColor: "#673ab7",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Add-Deck"
        component={AddDeckPage}
      />
    </AddDecksStack.Navigator>
  );
};
