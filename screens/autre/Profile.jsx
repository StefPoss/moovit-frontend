import React from "react";
import { View, Text, StyleSheet } from "react-native";



export default function LoginScreen(props) {
    let indice = 0.1;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
   text: { color: "red", fontSize: 24 },
});

