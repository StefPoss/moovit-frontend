import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  View,
 } from "react-native";

const ProgressStep = (props) => {
  //   let indice = xp; //variable qui sert a faire progressé la barre
  const [value, setValue] = useState(0);

  return(
<View style={styles.arc}>
  <AnimatedCircularProgress
    // z-index={9999}
    size={350}
    width={35}
    fill={value}
    // tintColor="#00e0ff"
    tintColor="rgba(0, 255, 72, 0.92)"
    backgroundColor="#3d5875"
    padding={10}
    arcSweepAngle={180}
    rotation={"270"}
    lineCap="round"
    onAnimationComplete={() => {
      setValue(props.niv);
    }}
  />
  </View>
)};

export default ProgressStep;
const styles = StyleSheet.create({
  arc:{
   marginLeft:"2%",
    marginTop:"8%",
    padding:0,
  }

})

