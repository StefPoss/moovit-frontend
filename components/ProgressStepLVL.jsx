import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View } from "react-native";

//a importé dans le terminal !!!npm i react-native-circular-progress + npm i --save react-native-circular-progress react-native-svg// npx expo install react-native-reanimated + yarn add react-native-circular-progress-indicator + yarn add react-native-svg

const ProgressStepLVL = (props) => {
  //   let indice = xp; //variable qui sert a faire progressé la barre
  const [value, setValue] = useState(0);
   let blue=value*2.55
  // let green=255/value //${green}
   let newRGB=`rgba(0, 255 , ${blue},0.99)`
   console.log(blue);
   
  return (
    <View style={styles.arc}>
      <AnimatedCircularProgress
        // z-index={9999}
        size={310}
        width={35}
        fill={value}
        // tintColor="#00e0ff"
        tintColor={newRGB}
        
        backgroundColor="#3d5875"
        padding={10}
        arcSweepAngle={180}
        rotation={"270"}
        lineCap="round"
      />
    </View>
  );
};

export default ProgressStepLVL;
const styles = StyleSheet.create({
  arc: {
    marginLeft: "8%",
    marginTop: "10%",
    paddingBottom: "9%",
  },
});
