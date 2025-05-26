import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

const ProgressBarComp = ({ count, total }) => {
  const c = Number(count);
  const t = Number(total);
  const progress = t > 0 ? (c + 1) / t : 0;

  return (
    <View>
      <Text style={{ color: "white", textAlign: "center", marginBottom: 4 }}>
        Progress: {Math.round(progress * 100)}% ({c}/{t})
      </Text>
      <ProgressBar
        progress={progress}
        color="rgb(100,81,159)"
        backgroundColor=""
        style={styles.progress}
      />
    </View>
  );
};

export default ProgressBarComp;

const styles = StyleSheet.create({
  progress: {
    width: "100%",
  },
});
