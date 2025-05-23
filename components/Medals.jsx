import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";//importation du module progressbar de native-paper

const activityCard = () => {
  return (

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Text>touchableOpacity Button</Text>
        </TouchableOpacity>

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
