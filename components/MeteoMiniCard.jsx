import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";//importation du module progressbar de native-paper

const ProgressBarComp = (props) => {
  let indice = xp//variable qui sert a faire progressé la barre
  return (
     <ProgressBar
                progress={indice}//progression via la variable xp !! 50% = 0.5
                color={"#8F40EB"}//violet du figma
                // backgroundColor={"#111"}
                style={styles.progress} 
              />
  );
};
export default ProgressBarXp;

const styles = StyleSheet.create({
  progress: {
    width: "300",//long de la barre
    height:"20",//haut de la barre
    borderRadius:5,//arrondi des angles
    backgroundColor: "#f9f9f9",//gris du figma
  },
});
