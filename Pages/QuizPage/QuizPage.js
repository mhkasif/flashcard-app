import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
  Animated,
} from "react-native";
import {
  GreenButtonFilled,
  RedButtonBorder,
  GoBackButton,
} from "../../Components/Buttons/Buttons";
import { clearLocalNotification, setLocalNotification } from "../../Data";

const QuizPage = ({
  route: {
    params: { questions },
  },
  navigation,
}) => {
  const [questionNumber, nextQuestion] = React.useState(0);
  const [correctAnswers, correct] = React.useState(0);
  const [showAnswer, changeCard] = React.useState(false);
  const [animation, changeAnimation] = React.useState({
    questionCard: {
      opacity: new Animated.Value(1),
      rotateY: new Animated.Value(0),
    },
  });
  const questionRotateValue = animation.questionCard.rotateY.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  /**
* @description toggle between question and answer

*/
  const toggleAnswer = async(val) => {
    if (val === 5 ) {
      new Promise((res, r) => {
        setTimeout(() => res(changeCard(false)), 0);
      });
      Animated.timing(animation.questionCard.rotateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
      return;
    }
    new Promise((res, r) => {
      setTimeout(() => res(changeCard(!showAnswer)), 400);
    });
    if (!showAnswer) {
      Animated.timing(animation.questionCard.rotateY, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation.questionCard.rotateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  };
  /**
* @description restarts the quiz

*/
  const resetQuiz = () => {
    correct(0);
    nextQuestion(0);
  };
  if (questions.length !== 0 && questionNumber >= questions.length) {
    clearLocalNotification().then(setLocalNotification);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.heading, { color: "black" }]}>
          Correct Answers: {correctAnswers}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <Button title="Reset" onPress={resetQuiz} />
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!questions.length ? (
        <View>
          <Text style={[styles.heading, { color: "black", padding: 30 }]}>
            Sorry You cannot take the quiz because there are no cards in the
            deck.
          </Text>
          <GoBackButton onPress={() => navigation.goBack()} />
        </View>
      ) : (
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Animated.View
            style={[
              styles.cardContainer,
              {
                opacity: animation.questionCard.opacity,

                transform: [
                  { perspective: 1500 },
                  { rotateY: questionRotateValue },
                ],
              },
            ]}
          >
            <ImageBackground
              source={require("../../assets/6.jpg")}
              style={[styles.cardContainer]}
            >
              <Text style={[styles.heading, showAnswer && styles.rotateText]}>
                {showAnswer
                  ? "Answer"
                  : ` QUESTION No: ${Number(questionNumber) + 1}/${
                      questions.length
                    }`}
              </Text>
              <Text style={[styles.heading, showAnswer && styles.rotateText]}>
                {showAnswer
                  ? questions[questionNumber].answer
                  : questions[questionNumber].question}
              </Text>
            </ImageBackground>
          </Animated.View>
          {/* <Animated.View
            style={[
              styles.cardContainer,
              {
                opacity: animation.answerCard.opacity,

                transform: [
                  { perspective: 1500 },
                  { rotateY: answerRotateValue },
                ],
                backfaceVisibility:'hidden'

              },
            ]}
          >
            <ImageBackground
              source={require("../../assets/6.jpg")}
              style={[styles.cardContainer]}
            >
              <Text style={styles.heading}>Answer</Text>
              <Text style={styles.heading}>
                {questions[questionNumber].answer}
              </Text>
            </ImageBackground>
          </Animated.View> */}
          <Button
            onPress={toggleAnswer}
            title={showAnswer ? "Show Question" : "Show Answer"}
          />
          <GreenButtonFilled
            onPress={() => {
              toggleAnswer(5);
              correct(correctAnswers + 1);
              nextQuestion(questionNumber + 1);
            }}
            text="Correct"
          />
          <RedButtonBorder
            onPress={() => {

              toggleAnswer(5);
              nextQuestion(questionNumber + 1);
            }}
            text="Incorrect"
          />
        </Animated.View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("screen").width - 50,

    height: 200,
    borderRadius: 5,
    marginTop: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 1,
    marginBottom: 25,
    //   fontWeight: "bold",
  },
  number: {
    fontSize: 18,
  },
  rotateText: {
    transform: [{ rotateY: "-180deg" }],
  },
});
export default QuizPage;
