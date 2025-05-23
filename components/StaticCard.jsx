import React from "react";
import { View, Text, StyleSheet } from "react-native";

function StaticCard({
    text='',
    width= "350", //long du boutton
    height= "75", //haut du boutton
    backgroundColor= "#000", //gris du figma
    color="#000",
}) {
  
  return (
    <View 
    style={[styles.static, {width, height, backgroundColor }]}
    >
      <Text style={[styles.staticText, { color: color }]}>{text}</Text>
    </View>
  );
};
export default StaticCard;

const styles = StyleSheet.create({
  static: {
    width: 350, //long du boutton
    height: 75, //haut du boutton
    borderRadius: 15, //arrondi des angles
    backgroundColor: "#000", //gris du figma
    margin: 5,
    padding: 5,
    marginRight:27,
  },
  staticText: {
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "700",
    color:"white",
  },
});
