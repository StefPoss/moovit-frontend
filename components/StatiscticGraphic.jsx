import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function StatisticGraphic(props) {
  const data = {
    labels: ["Temps de jeu", "Sessions", "XP"],
    datasets: [
      {
        data: [props.playTime, props.sessions, props.xp],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#F5F5FD", // fond pastel très clair
    backgroundGradientTo: "#F5F5FD",
    decimalPlaces: 0,
    color: () => "#6847DC", // barres violet doux
    labelColor: () => "#333333", // texte noir doux
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  const dynamicBorderRadius = Dimensions.get("window").width * 0.05;

  // Animation de pulsation
  const borderWidth = useSharedValue(2);

  useEffect(() => {
    borderWidth.value = withRepeat(
      withTiming(4, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          borderColor: "#BDA1FF",
          borderRadius: dynamicBorderRadius,
          overflow: "hidden",
        },
      ]}
    >
      <BarChart
        style={styles.barChart}
        data={data}
        width={Dimensions.get("window").width * 0.9}
        height={170}
        withVerticalLabels={true}
        withHorizontalLabels={false}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        fromZero={true}
        chartConfig={chartConfig}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5F5FD",
    marginBottom: 15,
    marginTop: 15,
  },
  barChart: {
    marginTop: 8,
  },
});
