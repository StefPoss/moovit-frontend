import React from "react";
import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function StatiscticGraphic(props) {
  const data = {
    labels: ["Temps de jeu", "Sessions", "XP"],
    datasets: [
      {
        data: [props.playTime, props.sessions, props.xp],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#f5f5fd", // Violet pastel très clair
    backgroundGradientTo: "#f5f5fd", /// permer de faire un dégradé
    decimalPlaces: 0,
    color: () => "#6B47DC", // Couleur des barres (violet doux)
    labelColor: () => "#333333", // Couleur des textes sous les barres
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.barChart}
        data={data}
        width={Dimensions.get("window").width * 0.9} //pour mettre la largeur à 90% et que ça soit responsive
        height={170}
        withVerticalLabels={true}
        withHorizontalLabels={false}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        fromZero={true}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  barChart: {
    borderRadius: 15,
    marginRight: 5,
  },
});
