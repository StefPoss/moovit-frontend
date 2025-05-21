import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";



export default function LoginScreen(props) {
    let indice = 0.1;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <ProgressBar
            progress={indice}
            color={"#8F40EB"}
            // backgroundColor={"#111"}
            style={styles.progress}
          />
      
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    width: "300",
    height:"20",
    borderRadius:5,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
   text: { color: "red", fontSize: 24 },
});

