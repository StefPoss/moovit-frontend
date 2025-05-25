import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function InstructionCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="chevron-forward-outline" size={24} />
        <View style={styles.timer}>
          <MaterialCommunityIcons name="timer-outline" size={24} />
          <Text style={styles.timerText}>{props.timing} mn</Text>
        </View>
      </View>
      <Text style={styles.bold}>{props.title1}</Text>
      <Text style={styles.bold}>{props.title2}</Text>
      <Text style={styles.bold}>{props.title3}</Text>

      <Text style={styles.label}>Instructions</Text>

      <Text style={styles.text}>
        <Text style={styles.bold}>Objectif :</Text> {props.desc}
      </Text>

      <Text style={styles.text}>
        <Text style={styles.bold}>Défi :</Text> Tenir la raquette correctement
        et réaliser quelques coups droits
      </Text>

      <Text style={styles.text}>
        <Text style={styles.bold}>Le TIP'S du Pro :</Text> {props.tip}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    marginTop: -20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginLeft: 5,
    fontWeight: "500",
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 18,
  },
  bold: {
    fontWeight: "600",
  },
});
