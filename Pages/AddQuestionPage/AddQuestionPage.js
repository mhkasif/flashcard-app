import React from "react";
import { View, Text, KeyboardAvoidingView, Keyboard,TextInput,TouchableWithoutFeedback } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import {TouchableOpacity} from 'react-native';
import {BlueButtonFilled} from '../../Components/Buttons/Buttons';
import {addCardToDeck} from '../../Data';

const AddQuestionPage = ({navigation,route:{params:{title}}}) => {
  const [value, onChangeText] = React.useState({
    question: "",
    answer: "",
  });
  let {question,answer}=value
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <KeyboardAvoidingView style={styles.view}>
      <TextInput
        style={styles.textInput}
        // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText({ ...value, question: text })}
        value={question}
        placeholder="Enter your question..."
        // multiline
      />
      <TextInput
        style={styles.textInput}
        // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText({ ...value, answer: text })}
        value={answer}
        placeholder="Write your answer..."
      />
     <BlueButtonFilled
     disabled={!question||!answer}
     onPress={()=>{addCardToDeck(title,{question,answer});navigation.goBack()}} text='Submit'/>
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
    borderColor: "#24b1ed",
    width: Dimensions.get("screen").width - 50,
    padding: 20,
    marginBottom:20,
    fontSize:18,
  },
  submitBtn:{

  }
});
export default AddQuestionPage;
