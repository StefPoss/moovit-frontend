import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import questionForm from "../data/onBoardingQuestion.json";

const ProgressBarComp = (props) => {
  let indice = xp
  return (
     <ProgressBar
                progress={indice}
                color={"#8F40EB"}
                // backgroundColor={"#111"}
                style={styles.progress}
              />
  );
};
export default ProgressBarXp;

const styles = StyleSheet.create({
  progress: {
    width: "300",
    height:"20",
    borderRadius:5,
    backgroundColor: "#f9f9f9",
  },
});
