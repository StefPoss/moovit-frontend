import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// tab barre à vérifier et à continuer non terminé
export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      {" "}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        {" "}
        <Ionicons name="home-outline" size={28} color="black" />{" "}
      </TouchableOpacity>{" "}
      <TouchableOpacity onPress={() => navigation.navigate("Play")}>
        {" "}
        <Ionicons name="play-circle-outline" size={40} color="black" />{" "}
      </TouchableOpacity>{" "}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        {" "}
        <Ionicons name="person-outline" size={28} color="black" />{" "}
      </TouchableOpacity>{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
