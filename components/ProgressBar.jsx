import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import questionForm from "../data/onBoardingQuestion.json";

const ProgressBarComp = (props) => {
  let indice = props.count / (questionForm.length - 1);
  return (
    <ProgressBar
      progress={indice}
      color={"rgb(100,81,159)"}
      backgroundColor={"#7d6bb3"}
      style={styles.progress}
    />
  );
};
export default ProgressBarComp;

const styles = StyleSheet.create({
  progress: {
    width: "100vw",
  },
});
