import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { onClick } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

//creation d'une carte d'activité clicable
function CardLevelClicable(
  {
    text = "", //text
    num = "", //numero de la carte
    description = "", //description s'affiche sous le txt
    color = "black", //color de la font
    fontSize = 13, //fontseize pour le titre
    fontWeight = "700", //la fontWeight de toute les lettre
    width = "150", //long du boutton
    height = "150", //haut du boutton
    backgroundColor = "#FCEACE", //couleur du fond de la carte
    url = "https://reactnative.dev/img/tiny_logo.png", //petite img sur le coté
    linkTo = "TabNavigator", //nom de la page ou rediriger
    fill = false, //image qui fait tout le composant
  },
  props
) {
  const navigation = useNavigation();

  // const idf =()=>{
  //   props.keyNum(props.key);
  // }
  return (
    <TouchableOpacity //propriete qui permet de clicker comme button et onpress
      onPress={() => {
        navigation.navigate(linkTo);
      }} //lien executable au click
      style={[styles.button, { width, height, backgroundColor }]} //modif du css via les props
    >
      <View
        style={styles.container} // contenaier general
      >
        <View
          style={styles.lines} //container uniquement des lignes txt+description permet de gardé l'img dans le cadre du container
        >
          <Text
            style={[styles.buttonText, { color, fontWeight, fontSize }]} //txt en titre modifiable via les props
          >
            {text}
            {num}
          </Text>
          <Text
            style={[styles.buttonDescription, { color, fontWeight }]} // txt de despription
          >
            {description}
          </Text>
        </View>
        <Image
          style={fill ? [styles.tinyLogo2, {}] : [styles.tinyLogo, {}]}
          source={{ uri: url }} //petit img d'illustration du coté
        />
      </View>
    </TouchableOpacity>
  );
}
export default CardLevelClicable;

const styles = StyleSheet.create({
  button: {
    width: "150", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
    backgroundColor: "#FCEACE", //gris du figma
    margin: 5,
    marginRight: 5,
  },
  container: {
    marginTop: "10",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(1, 1, 1, 0)",
    minWidth: "99%",
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 13,
    fontWeight: "700",
    color: "black",
  },
  buttonDescription: {
    flex: 0,
    flexWrap: "wrap",
    fontSize: 10,

    marginLeft: 15,
    fontWeight: "500",
    color: "black",
  },
  lines: {
    width: "60%",
  },
  tinyLogo: {
    borderRadius: 15,
    alignSelf: "flex-end",
    width: "30%",
    height: "85%",
    margin: 10,
    marginRight: 15,
  },
  tinyLogo2: {
    flex: 1,
    zIndex: -99999,
    borderRadius: 15,
    alignSelf: "center",
    // justifyContent:"center",
    width: "50%",
    height: "105%",
    marginLeft: "-59%",
    marginRight: "1%",
    marginTop: "-2%",
    marginBottom: "5%",
  },
});
