import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";


export default function ActivityCard({
  text = "",
  width = "150", //long du boutton
  height = "150", //haut du boutton
  backgroundColor = "#FCEACE", //gris du figma
  url = "",
  color = "black",
  fontWeight = "700",
}) {
  const linkTo = () => {};

  return (
    <TouchableOpacity
      onPress={() => linkTo}
      style={[styles.button, { width, height, backgroundColor }]}
    >
      <Image
        style={[styles.tinyLogo, { width, height }]}
        source={url ? { uri: url } : null}
      />
      <Text style={[styles.buttonText, { color, fontWeight }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "150", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
    backgroundColor: "#FCEACE", //gris du figma
    margin: 5,
  },

  buttonText: {
    flex: 0,
    zIndex: 99999,
    textAlign: "center",
    marginTop: -100,
    fontWeight: "700",
    color: "black",
  },
  tinyLogo: {
    borderRadius: 15,
    width: 66,
    height: 58,
  },
});
