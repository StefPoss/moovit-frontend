import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const activityCard = (props) => {


  // let text = 'Activitées'
    
    const linkTo=()=>{}

  return (

        <TouchableOpacity
          style={styles.button}
          onPress={() => linkTo}
        >
          <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>

  );
};
export default activityCard;

const styles = StyleSheet.create({
  button: {
    width: "150",//long du boutton
    height:"150",//haut du boutton
    borderRadius:15,//arrondi des angles
    backgroundColor: "#FCEACE",//gris du figma
    margin:5,
  },
  buttonText:{
    flex:1,
    textAlign:"center",
    marginTop:55,
    fontWeight:"700",

  },
});
