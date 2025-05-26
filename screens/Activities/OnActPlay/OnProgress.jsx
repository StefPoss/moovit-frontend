import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import SemiCircleProgress from "../../../components/SemiCircleProgress";

export default function OnProgress({ navigation, level, total }) {
  const numLevel = level;
  const totallevel = total;
  const pourcentage = Math.round((numLevel / totallevel) * 100);

  return (
    <SafeAreaView>
      <View style={styles.contain}>
        <SemiCircleProgress
          percentage={pourcentage}
          progressColor={"green"}
          progressShadowColor={"#ccc"}
          interiorCircleColor={"#fff"}
          circleRadius={100}
          progressWidth={14}
        >
          <Text style={styles.percentageText}>
            {numLevel}/{total}
          </Text>
        </SemiCircleProgress>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    borderWidth: 3,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
  },
});
