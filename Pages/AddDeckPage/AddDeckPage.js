import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { BlueButtonFilled } from "../../Components/Buttons/Buttons";
import { saveDeckTitle } from "../../Data";
import { useFocusEffect } from "@react-navigation/native";
const images = [
  { source: require("../../assets/1.jpg") },
  { source: require("../../assets/2.jpg") },
  { source: require("../../assets/3.jpg") },
  { source: require("../../assets/4.jpg") },
  { source: require("../../assets/5.jpg") },
];
const AddDeckPage = ({ navigation }) => {
  const [value, onChangeText] = useState("");
  const [borderColor, changeColor] = useState("#a8a8a8");
  const image = images[Math.floor(Math.random() * 5)].source;
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        onChangeText("");
      };
    }, [])
  );
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        changeColor("#a8a8a8");
      }}
      accessible={false}
    >
      <KeyboardAvoidingView style={styles.view}>
        <Text style={styles.heading}>What is the title of your new Deck?</Text>
        <TextInput
          style={[styles.textInput, { borderColor: borderColor }]}
          // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Title of your Deck..."
          multiline
          onFocus={() => changeColor("#24b1ed")}
        />
        <BlueButtonFilled
          disabled={!value}
          onPress={() => {
            saveDeckTitle(value, image);
            navigation.navigate("Deck-Details", { title: value });
          }}
          text="Create Deck"
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderBottomWidth: 2,
    // borderColor: "#f7f7f7",
    width: Dimensions.get("screen").width - 50,
    padding: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  heading: {
    fontSize: 22,
    letterSpacing: 1,
    marginBottom: 90,
    fontWeight: "bold",
    lineHeight: 40,
  },
});
export default AddDeckPage;
