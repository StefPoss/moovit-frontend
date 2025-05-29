import React from "react"
import { SafeAreaView } from "react-native"
import MooveItFunChart from "../components/MooveItFunChart" // <--- chemin à corriger si besoin

export default function TestChartScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <MooveItFunChart totalTime={123} exercises={7} xp={88} realTime={42} />
    </SafeAreaView>
  )
}
