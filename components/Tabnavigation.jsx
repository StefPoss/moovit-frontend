import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Tableau des onglets
const tabs = [
  { name: "home-outline", screen: "Home" },
  { name: "play-circle-outline", screen: "Play" },
  { name: "person-outline", screen: "Profile" }
];

export default function BottomNavBar() {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("Home");

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = activeScreen === tab.screen;
          return (
            <TouchableOpacity
              key={tab.screen}
              onPress={() => {
                setActiveScreen(tab.screen);
                navigation.navigate(tab.screen);
              }}
              style={[styles.iconBox, isActive && styles.active]}
            >
              <Ionicons
                name={tab.name}
                size={28}
                color={isActive ? "#785BFF" : "#222"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// style de la barre et des icones
const styles = StyleSheet.create({
  container: {
    //position: "absolute",
    bottom: 40,
    width: "100%",
    //alignItems: "center",
    marginLeft: 25, // pour aligner la barre au centre
  },
  bar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 24,
    width: "90%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  iconBox: {
    padding: 10,
    borderRadius: 20,
  },
  active: {
    backgroundColor: "#EFE8FF",
  },
});
