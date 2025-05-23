import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";

function CardLevelClicable({
  text = "",
  color="black",
  width = "150", //long du boutton
  height = "150", //haut du boutton
  backgroundColor = "#FCEACE", //gris du figma
  url = "https://reactnative.dev/img/tiny_logo.png",
  fontWeight = "700",
}) {
  const linkTo = () => {};

  return (
    <TouchableOpacity
      onPress={() => linkTo}
      style={[styles.button, { width, height, backgroundColor }]}
    >
        <View style={styles.container}>
        <Text style={[styles.buttonText, { color, fontWeight }]}>{text}</Text>
      <Image
        style={[styles.tinyLogo, { }]}
        source={{  uri: url, }}
      />
      
        </View>

    </TouchableOpacity>
  );
}
export default CardLevelClicable;

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        
        


    },
  button: {
    width: "150", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
    backgroundColor: "#FCEACE", //gris du figma
    margin: 5,
    marginRight:27,
  },

  buttonText: {
    marginLeft:15,
    fontWeight: "700",
    color: "black",
  },
  tinyLogo: {
    borderRadius: 15,
    // alignSelf:"flex-end",
    width: 66,
    height: 58,
    margin:10,
    marginRight:15,

    flex: 0,
    justifyContent:"center",
    alignItems:"center",
    textAlign: "center",
  },
});
