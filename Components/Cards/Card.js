import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// const image = { uri: "https://reactjs.org/logo-og.png" };
const images = [
  { source: require("../../assets/1.jpg") },
  { source: require("../../assets/2.jpg") },
  { source: require("../../assets/3.jpg") },
  { source: require("../../assets/4.jpg") },
  { source: require("../../assets/5.jpg") },
];
const Card = ({  navigation, noNavigation,data }) => {

const arrayData=Object.entries(data)
const {source,title,questions}=arrayData[0][1]

  return data&& noNavigation ? (
    <ImageBackground source={source} style={styles.cardContainer}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.number}>{questions.length} cards</Text>
    </ImageBackground>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Deck-Details",{title})}
    >
    <ImageBackground source={source} style={styles.cardContainer}>

        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.number}>{questions.length} cards</Text>

        </ImageBackground>

    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("screen").width - 50,
    // backgroundColor: "red",
    height: 200,
    borderRadius: 5,
    marginTop: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    //   color:'#',
    fontSize: 25,
    letterSpacing: 1,
    marginBottom: 25,
    fontWeight: "bold",
  },
  number: {
    fontSize: 18,
  },
});
export default Card;
