import React from "react";

import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export const BlueButtonFilled = (
  { text, navigation, onPress, disabled, style },
  props
) => {
  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      style={{ opacity: disabled ? "0.5" : "1" }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.addCardBtn, styles.btn, style]}
        onPress={onPress}
      >
        <Text style={styles.txt}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const GreenButtonFilled = (
  { text, navigation, onPress, disabled, style },
  props
) => {
  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      style={{ opacity: disabled ? "0.5" : "1" }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        style={[style, styles.correctBtn, styles.btn]}
        onPress={onPress}
      >
        <Text style={styles.txt}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const BlueButtonBorder = (
  { text, navigation, onPress, style },
  props
) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[style, styles.startQuizBtn, styles.btn]}
      onPress={onPress}
    >
      <Text style={[styles.txt, { color: "#24b1ed" }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const RedButtonBorder = ({ text, onPress, style }, props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.deleteDeckBtn, styles.btn, style]}
    >
      <Text style={[styles.txt, { color: "#f70000" }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 18,
    color: "white",
  },
  btn: {
    width: 200,
    height: 60,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addCardBtn: {
    backgroundColor: "#24b1ed",
  },
  correctBtn: {
    backgroundColor: "#21ba45",
  },
  startQuizBtn: {
    borderWidth: 2,
    borderColor: "#24b1ed",
  },
  deleteDeckBtn: {
    borderWidth: 2,
    borderColor: "#f70000",
  },
});
