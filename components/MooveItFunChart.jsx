import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { BarChart, Grid } from "react-native-svg-charts"

export default function MooveItFunChart(props) {
  const { xp = 250, totalTime = 360, exercises = 0 } = props

  // Log pour vérifier les props
  console.log("MooveItFunChart props =", { xp, totalTime, exercises })

  const data = [
    {
      value: totalTime,
      label: "Temps total",
      svg: { fill: "#E9FEE1" },
    },
    {
      value: exercises,
      label: "Exos",
      svg: { fill: "#E4F0F4" },
    },
    {
      value: xp,
      label: "XP",
      svg: { fill: "#C5C4D9" },
    },
  ]

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tes perfs du moment</Text>
      <BarChart
        style={{ height: 70, width: 280 }}
        data={data}
        yAccessor={({ item }) => item.value}
        svg={({ item }) => item.svg}
        spacingInner={0.5}
        gridMin={10}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      >
        <Grid />
      </BarChart>
      <View style={styles.labelContainer}>
        {data.map((item, idx) => (
          <Text key={idx} style={styles.label}>
            {item.label}
          </Text>
        ))}
      </View>
      <Text style={styles.xpCongrats}>
        🎉 Bravo ! +{xp} XP gagnés aujourd’hui 🎉
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#3D3F65",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    elevation: 2,
    margin: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    alignContent: "space-evenly",
  },
  xpCongrats: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#CFDED3",
    letterSpacing: 0.3,
  },
})
