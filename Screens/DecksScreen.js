import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AddQuestionPage from "../Pages/AddQuestionPage/AddQuestionPage";
import DecksPage from "../Pages/DecksPage/DecksPage";
import DeckDetailsPage from "../Pages/DeckDetailsPage/DeckDetailsPage";
import QuizPage from "../Pages/QuizPage/QuizPage";

const DecksStack = createStackNavigator();

export const DecksStackScreen = () => {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen
        options={{
          title: "Decks",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Decks"
        component={DecksPage}
      />
      <DecksStack.Screen
        options={{
          title: "Deck-Details",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Deck-Details"
        component={DeckDetailsPage}
      />
      <DecksStack.Screen
        options={{
          title: "Add Question",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            //   fontWeight: "bold",
          },
        }}
        name="Add-Question"
        component={AddQuestionPage}
      />
      <DecksStack.Screen
        options={{
          title: "Quiz",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            //   fontWeight: "bold",
          },
        }}
        name="Quiz"
        component={QuizPage}
      />
    </DecksStack.Navigator>
  );
};
