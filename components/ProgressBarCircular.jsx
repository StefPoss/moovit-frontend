import React from "react"
import { View, Text, StyleSheet } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"

const CARD_WIDTH = 340
const CARD_HEIGHT = 75
const CIRCLE_RADIUS = 21

export default function ProgressBarCircular({
  levelTitle = "Niveau de progression",
  completedSteps = 8,
  totalSteps = 10,
}) {
  const percent = Math.round((completedSteps / totalSteps) * 100)
  return (
    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
      <View style={styles.leftBlock}>
        <Text style={styles.title}>{levelTitle}</Text>
        <Text style={styles.steps}>
          {completedSteps}/{totalSteps} exercices complétés
        </Text>
      </View>
      <View style={styles.rightBlock}>
        {/* Cercle + overlay du % */}
        <View style={styles.progressCircleContainer}>
          <CircularProgress
            value={percent}
            radius={CIRCLE_RADIUS}
            maxValue={100}
            activeStrokeColor="#a88afc"
            inActiveStrokeColor="#262626"
            activeStrokeWidth={4}
            inActiveStrokeWidth={4}
            progressValueColor="transparent" // Cache le texte interne
            title="" // Pas de title, on overlay le texte custom
            duration={1000}
          />
          <Text style={styles.percentText}>{percent}%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    marginVertical: 12,
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 5,
  },
  leftBlock: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  steps: {
    color: "#fff",
    fontSize: 15,
    opacity: 0.85,
  },
  rightBlock: {
    width: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircleContainer: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  percentText: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    includeFontPadding: false,
  },
})
