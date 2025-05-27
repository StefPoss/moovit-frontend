import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OnDone(props) {
  const [rating, setRating] = useState(0);

  const stats = {
    niveau: "Débutant",
    xp: props.xp,
    calories: "154 kcal",
  };

  const userName = "Username";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🎉</Text>

        <Text style={styles.title}>Bon travail {props.user} !</Text>
        <Text style={styles.subtitle}>
          tu as terminé ta séance d'entraînement
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBlock}>
            <Text style={styles.statIcon}>🕒</Text>
            <Text style={styles.statLabel}>Durée</Text>
            <Text style={styles.statValue}>{props.timing}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statIcon}>💪</Text>
            <Text style={styles.statLabel}>Sport</Text>
            <Text style={styles.statValue}>{props.sport}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statIcon}>🧡</Text>
            <Text style={styles.statLabel}>XP gagnés</Text>
            <Text style={styles.statValue}>{stats.xp}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{stats.calories}</Text>
          </View>
        </View>

        <Text style={styles.note}>Note ton expérience !</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setRating(i);
                console.log(i);
              }}
            >
              <Ionicons
                name={i <= rating ? "star" : "star-outline"}
                size={32}
                color={"orange"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 16,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "ManropeExtraBold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "ManropeRegular",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 32,
  },
  statBlock: {
    alignItems: "center",
    width: "40%",
    marginVertical: 12,
  },
  statIcon: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    fontFamily: "ManropeExtraBold",
  },
  statValue: {
    fontSize: 14,
    marginTop: 2,
  },
  note: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: "ManropeExtraBold",
  },
  starsContainer: {
    flexDirection: "row",
  },
});
