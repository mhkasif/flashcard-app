import React from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import Card from "../../Components/Cards/Card";
import {
  BlueButtonFilled,
  BlueButtonBorder,
  RedButtonBorder,
} from "../../Components/Buttons/Buttons";
import { deleteDeck, addCardToDeck, getDeck } from "../../Data";
import { useFocusEffect } from "@react-navigation/native";

const DeckDetailsPage = ({ navigation, route: { params } }) => {
  console.log(params);
  const [values, changeVal] = React.useState(null);

  const { title } = params;
  const [animation, changeAnim] = React.useState({
    card: {
      opacity: new Animated.Value(0),
    },
    button1: {
      translateY: new Animated.Value(0),
    },
    button2: {
      translateY: new Animated.Value(0),
    },
    button3: {
      translateY: new Animated.Value(0),
    },
  });
  const interpolate1 = animation.button1.translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  const interpolate2 = animation.button2.translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  const interpolate3 = animation.button3.translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });
  // React.useEffect(() => {
  //   console.log('deck details rendered out');

  //   const unsubscribe = navigation.addListener("focus", () => {
  //     // Screen was focused
  //     // Do something
  //     console.log('deck details rendered');
  //     Animated.timing(animation.card.opacity, {
  //       toValue: 1,
  //       duration:800,
  //       useNativeDriver:true
  //     }).start();
  //     Animated.timing(animation.button1.translateY, {
  //       toValue: 1,
  //       duration: 800,
  //       useNativeDriver:true

  //     }).start();
  //     Animated.timing(animation.button2.translateY, {
  //       toValue: 1,
  //       duration: 500,
  //       delay:400,
  //       useNativeDriver:true

  //     }).start();
  //     Animated.timing(animation.button3.translateY, {
  //       toValue: 1,
  //       duration: 500,
  //       delay:600,
  //       useNativeDriver:true

  //     }).start();

  //     const abc = async () => {
  //       let dt = await getDeck(title);
  //       dt = JSON.parse(dt);
  //       const newParam = {
  //         [dt.title]: dt,
  //       };

  //       changeVal(newParam);
  //     };
  //     abc();
  //     return ()=>{

  //       unsubscribe()
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("deck details rendered out");

      const unsubscribe = navigation.addListener("focus", () => {
        // Screen was focused
        // Do something
        console.log("deck details rendered");
        Animated.timing(animation.card.opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
        Animated.timing(animation.button1.translateY, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
        Animated.timing(animation.button2.translateY, {
          toValue: 1,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }).start();
        Animated.timing(animation.button3.translateY, {
          toValue: 1,
          duration: 500,
          delay: 600,
          useNativeDriver: true,
        }).start();

        const abc = async () => {
          let dt = await getDeck(title);
          dt = JSON.parse(dt);
          const newParam = {
            [dt.title]: dt,
          };

          changeVal(newParam);
        };
        abc();
      });
      return () => {


        changeVal(null);

      };
    }, [navigation, params])
  );

  return (
    values &&
    Object.entries(values)[0][1] &&
    Object.entries(values)[0][1].questions && (
      <Animated.View
        style={[styles.decksDetailPage, { opacity: animation.card.opacity }]}
      >
        <Card noNavigation data={values || params} />
        <View style={styles.buttonsContainer}>
          <BlueButtonFilled
            onPress={() => {
              navigation.navigate("Add-Question", { title });
            }}
            text="Add Card"
            style={{ transform: [{ translateY: interpolate1 }] }}
          />
          <BlueButtonBorder
            onPress={() => {
              navigation.navigate("Quiz", {
                questions: Object.entries(values)[0][1].questions,
              });
            }}
            style={{ transform: [{ translateY: interpolate2 }] }}
            text="Start Quiz"
          />
          <RedButtonBorder
            onPress={() => {
              deleteDeck(title);
              navigation.goBack();
            }}
            text="Delete Deck"
            style={{ transform: [{ translateY: interpolate3 }] }}
          />
        </View>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  decksDetailPage: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("screen").width,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    marginTop: 40,
  },
});
export default DeckDetailsPage;
