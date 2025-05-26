import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
//creation d'une carte d'activité clicable
function CardLevelClicable({
  text = "", //text
  description = "", //description s'affiche sous le txt
  color = "black", //color de la font
  fontWeight = "700", //la fontWeight de toute les lettre
  width = "150", //long du boutton
  height = "150", //haut du boutton
  backgroundColor = "#FCEACE", //couleur du fond de la carte
  url = "https://reactnative.dev/img/tiny_logo.png", //petite img sur le coté
}) {
  const linkTo = () => {}; //lien utilisable au click

  return (
    <TouchableOpacity //propriete qui permet de clicker comme button et onpress
      onPress={() => linkTo} //lien executable au click
      style={[styles.button, { width, height, backgroundColor }]} //modif du css via les props
    >

        // title

// mediaUrl

// description

// tipOfThePro

// timing

// xp

// image

      <View style={styles.container}// contenaier general
       >
        <View style={styles.lines} //container uniquement des lignes txt+description permet de gardé l'img dans le cadre du container
        > 
          <Text style={[styles.buttonText, { color, fontWeight }]} //txt en titre modifiable via les props
          >{text}</Text>
          <Text style={[styles.buttonDescription, { color, fontWeight }]} // txt de despription
          > {description}</Text>
        </View>
        <Image style={[styles.tinyLogo, {}]} source={{ uri: url }} //petit img d'illustration du coté
        />
      </View>
    </TouchableOpacity>
  );
}
export default CardLevelClicable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(1, 1, 1, 0)",
    minWidth: "99%",
  },
  button: {
    width: "150", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
    backgroundColor: "#FCEACE", //gris du figma
    margin: 5,
    marginRight: 27,
  },

  buttonText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  buttonDescription: {
    flex: 0,
    flexWrap: "wrap",
    marginLeft: 15,
    fontWeight: "700",
    color: "black",
  },
  lines: {
    width: "60%",
  },
  tinyLogo: {
    borderRadius: 15,
    // alignSelf:"flex-end",
    width: "30%",
    height: "85%",
    margin: 10,
    marginRight: 15,
  },
});




// Développer un composant "Sub-Level" pour le dashboard frontend permettant d’afficher des niveaux secondaires ou sous-niveaux liés à un utilisateur, une tâche ou un module spécifique.

// Critères d’acceptation :

// Le composant doit afficher un sous-niveau avec les valeurs suivantes :

// title

// mediaUrl

// description

// tipOfThePro

// timing

// xp

// image

// Doit être facilement intégrable dans des sections existantes du dashboard.

// Responsive design : affichage correct sur desktop et mobile.

// Possibilité de personnaliser les couleurs, icônes ou labels via des props.