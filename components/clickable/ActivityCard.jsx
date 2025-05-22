import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";//importation du module progressbar de native-paper

const activityCard = () => {

    const linkTo=()=>{}

  return (

        <TouchableOpacity
          style={styles.button}
          onPress={() => linkTo}
        >
          <Text>touchableOpacity Button</Text>
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
  },
});
