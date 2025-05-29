import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { performLinearAnimation } from "react-native-circular-progress/src/AnimatedCircularProgress";

export default function ExercisesProgressBar(props) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={70}
        width={8}
        fill={props.value ? props.value : 0} // Ici, 90%
        tintColor="#ffffff"
        backgroundColor="#362956"
        rotation={0} // Angle de départ
        lineCap="round"
        duration={1000}
      >
        {(fill) => (
          <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  progressText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
  },
});
