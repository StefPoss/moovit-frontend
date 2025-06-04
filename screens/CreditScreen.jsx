// import React from "react";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
//!!yarn add react-native-linear-gradient

const { height: screenHeight } = Dimensions.get("window"); //methode pour obtenir la hauteur de la fenetre/ecran du portable

export default function CreditScreen({ navigation }) {
  const translateY = useRef(new Animated.Value(screenHeight)).current;


  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateY, {
        toValue: -600, // Tu peux ajuster selon la hauteur de ton texte
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {
        iterations: -1, // Boucle infinie
        resetBeforeIteration: true, // remet la valeur de départ à chaque boucle
      }
    );

    animation.start();
    return () => animation.stop(); // Nettoyage à la destruction du composant
  }, []);

  return (
    <SafeAreaView style={styles.all}>
      {/* FOND NOIR */}
      <View style={StyleSheet.absoluteFill} />
            {/* GRADIENT EN HAUT */}
      <LinearGradient
      colors={["rgba(247, 216, 216, 1)", "rgba(247, 216, 216, 0)"]}
        style={[styles.fadeTop]}
        pointerEvents="box-only"
      />

      <View style={styles.mask}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.backButton}>

        </View>
        <View style={styles.body}>
          <View style={styles.heading}>
            {" "}
            <Text style={styles.center}>Staff by Alphabetic Order:</Text>{" "}
          </View>
        </View>
              


        <Animated.View
          style={[styles.creditsContainer, { transform: [{ translateY }] }]}
        >
          {/* <ScrollView > */}

          <View style={styles.center}>
            <Text style={styles.heading}>Amel{"\n"}"Sousmarin"</Text>
            <Text style={styles.heading}>Nico{"\n"}"Marcha Pas"</Text>
            <Text style={styles.heading}>Sami{"\n"}"Machine"</Text>
            <Text style={styles.heading}>Stephane{"\n"}"Buddy"</Text>
            <Text style={styles.heading}>Soufiane{"\n"}"Neo"</Text>
          </View>
          <View>
            <Text style={styles.center}>and</Text>
            <Text style={styles.heading}>Julien{"\n"}""</Text>
          </View>
          <Text style={styles.center}>
            Projet de fin de Batch#165 @Nice_2025
          </Text>

          {/* </ScrollView> */}
        </Animated.View>
      </View>
            {/* GRADIENT EN BAS */}
      <LinearGradient
      colors={["rgba(247, 216, 216, 0)", "rgba(247, 216, 216, 1)"]}


        style={[styles.fadeBottom]}
        pointerEvents="none"
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: "rgba(247, 216, 216, 1)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

    padding: 24,
  },
  mask:{
        // backgroundColor: "rgba(247, 216, 216, 0.53)",
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
    zIndex:2,
  },
  creditsContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  center: {
    fontFamily: "ManropeSemiBold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    // fontWeight: "600",
    paddingBottom: "3%",
    color: "rgba(1, 1, 1, 0.54)",
    zIndex: 2,

  },

  heading: {
    paddingVertical: "4%",
    paddingHorizontal: "2%",
    fontFamily: "CocomatPro-Regular",
    color: "rgb(255, 0, 0)",
    // color: "rgba(255,255,255,1)",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 29,
    fontWeight: "700",
    marginBottom: 4,
  },
  body: {marginTop:"-12%"},
  fadeTop: {
    position: 'absolute',
    top: 0,
    height: 500,
    width: '100%',
    zIndex: 1,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    height: 500,
    width: '100%',
    zIndex: 1,
    // color:'rgba(247, 216, 216,0.9)',
  },
});
