import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    opacity = "1",
    fill = false, //image qui fait tout le composant
    subLevelSent = {},
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
        navigation.navigate(linkTo, { subLevel: subLevelSent });
      }} //lien executable au click
      style={[styles.button, { width, height, backgroundColor }]} //modif du css via les props
    >
      <View
        style={[styles.container, { opacity }]} // contenaier general
      >
        <View
          style={styles.lines} //container uniquement des lignes txt+description permet de gardé l'img dans le cadre du container
        >
          <Text
            style={[styles.buttonText, { color, fontWeight, fontSize }]} //txt en titre modifiable via les props
          >
            {text}
            {/* {num} */}
          </Text>
          <Text
            style={[styles.buttonDescription, {}]} // txt de despription
          >
            {description}
          </Text>
        </View>
        <Image
          style={url===''? [styles.tinyLogo0, {}] :fill ? [styles.tinyLogo2, {}] : [styles.tinyLogo, {}]} //ternaire qui permet de changé de still si fill dans les props est false or true
          source={{ uri: url }} //petit img d'illustration du coté
        />
      </View>
    </TouchableOpacity>
  );
}
export default CardLevelClicable;

const styles = StyleSheet.create({
  button: {
    //c'est le composant en lui meme
    width: "150", //long du composant
    height: "150", //haut du composant
    borderRadius: 15, //arrondi des angles
    backgroundColor: "#FCEACE", //couleur du bg du composant
    margin: 5, //
    marginRight: 5,
  },
  container: {
    //zone d'affichage interne au composant
    marginTop: "10",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(1, 1, 1, 0)",
    minWidth: "99%",
    opacity: "0.4",
  },

  buttonText: {
    // titre
    marginLeft: 15,
    fontSize: 13,
    fontWeight: "700",
    color: "black",
  },
  buttonDescription: {
    //description sous le titre
    flex: 0,
    flexWrap: "wrap",
    fontSize: 12,

    marginLeft: 15,
    fontWeight: "500",
    color: "#9a9898",
  },
  lines: {
    // box qui contient le titre et la description
    width: "60%",
  },
<<<<<<< HEAD
  tinyLogo0:{},
  tinyLogo: { //petit logo a drt
    backgroundColor:'#e0e0e0',
=======
  tinyLogo: {
    //petit logo a drt
    backgroundColor: "#e0e0e0",
>>>>>>> 32eae8d33c5e4ad63c41dd6c60f2f126820cbef0
    borderRadius: 15,
    alignSelf: "flex-end",
    width: "30%",
    height: "85%",
    margin: 10,
    marginRight: 15,
  },
  tinyLogo2: {
    //etatlement du logo comme une img de bg sur toute la taille du composant
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
