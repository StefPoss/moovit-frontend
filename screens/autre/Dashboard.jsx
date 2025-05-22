import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActivityCard from "../../components/clickable/ActivityCard";

export default function LoginScreen(props) {
  let indice = 0.1;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DashBoard</Text>

      <ActivityCard style={styles.activity}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "red", fontSize: 24 },
  activity:{

  },
});
