import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressStep from "../../../components/ProgressStep";

export default function OnReward({
  navigation,
  xp,
  name,
  medalUri,
  levelplus,
  levelmoins,
  pourcent,
  onPress,
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.backBtn} onPress={() => onPress()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Ton avancement !</Text>
        <Text style={styles.subText}>
          Suivez vos progrès et voyez à quel point vous êtes proche du niveau
          suivant.
        </Text>
        <View style={styles.prog}>
          <ProgressStep niv={pourcent} epaisseur={30} largeur={300} />
        </View>
        <View style={styles.textProg}>
          <Text>{levelmoins}</Text>
          <Text>{pourcent}%</Text>
          <Text>{levelplus}</Text>
        </View>
        <View style={styles.rewardBox}>
          <Text style={styles.rewardText}>
            Tu as gagné {xp} XP !{"\n"}Nouvelle médaille débloquée
          </Text>
        </View>

        <Image
          source={{
            uri:
              medalUri ??
              "https://res.cloudinary.com/deuhttaaq/image/upload/v1747746036/projectFinDeBatch/front/images/medals/medal-padel-04_qowywo.png",
          }}
          style={styles.medal}
          resizeMode="contain"
        />

        <Text style={styles.medalTitle}>{name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  prog: {
    width: 100,
    height: 100,
    alignItems: "center",
  },
  backBtn: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    fontFamily: "arial",
    fontFamily: "ManropeRegular",
  },
  subText: {
    fontSize: 15,
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
    fontFamily: "ManropeRegular",
  },
  rewardBox: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 20,
    marginTop: "40%",
  },
  rewardText: {
    fontSize: 16,
    textAlign: "center",
  },
  medal: {
    width: 120,
    height: 120,
    marginTop: 10,
  },
  medalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "uppercase",
  },
  textProg: {
    flexDirection: "row",

    bottom: "-12%",
    width: "80%",
    justifyContent: "space-between",
  },
});
