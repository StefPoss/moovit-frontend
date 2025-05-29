import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { BarChart, Grid } from "react-native-svg-charts"
import { G, Text as SvgText } from "react-native-svg"

const Labels = ({ x, y, bandwidth, data }) => (
  <G>
    {data.map((item, index) => {
      console.log("item", item, "y", y(item.value))
      return (
        <SvgText
          key={index}
          x={x(index) + bandwidth / 2}
          y={y(item.value) - 10}
          fontSize={22}
          fill="#fff"
          alignmentBaseline="middle"
          textAnchor="middle"
          fontWeight="bold"
        >
          {item.value}
        </SvgText>
      )
    })}
  </G>
)

export default function MooveItFunChart({
  totalTime = 0,
  exercises = 0,
  xp =0,
}) {
  const data = [
    { value: totalTime, label: "Temps total", svg: { fill: "#E9FEE1" } },
    { value: exercises, label: "Exos", svg: { fill: "#E4F0F4" } },
    { value: xp, label: "XP", svg: { fill: "#C5C4D9" } },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tes perfs du moment</Text>
      <BarChart
        style={{ height: 100, width: 280 }}
        data={data}
        yAccessor={({ item }) => item.value}
        svg={({ item }) => item.svg}
        spacingInner={0.5}
        gridMin={0}
        contentInset={{ top: 24, bottom: 8 }}
      >
        <Grid />
        <Labels />
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
