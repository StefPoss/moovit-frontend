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
import { updateUser } from "../../../reducers/userSlice";
import { addActivityToStore } from "../../../reducers/activitySlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function OnReward({
  xp,
  name,
  medalUri,
  levelplus,
  levelmoins,
  pourcent,
  sport,
  token,
  updatelvl,
  xpUpdated,
  renit,
  sessions,
  playTime,
  timing,
}) {
  const dispatch = useDispatch();
  const subLevelUpdated = updatelvl[1];
  const levelUpdated = updatelvl[0];
  const sessionUpd = sessions + 1;
  const playUpd = playTime + timing;
  const imagePadel = [
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747827625/projectFinDeBatch/front/images/medals/medal-padel-04_pspous.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747827083/projectFinDeBatch/front/images/medals/medal-padel-03_j1xbl9.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747826943/projectFinDeBatch/front/images/medals/medal-padel-02_enz2s8.png",
  ];

  const imagePool = [
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747826097/projectFinDeBatch/front/images/medals/medal-natation-04_dabzkx.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747811166/projectFinDeBatch/front/images/medals/medal-natation-01_sva2zb.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747747696/projectFinDeBatch/front/images/medals/medal-natation-05_rhqkre.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747747682/projectFinDeBatch/front/images/medals/medal-natation-01_bktbt8.png",
  ];

  function getRandomImage(sport) {
    const images = sport === "Padel" ? imagePadel : imagePool;
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }

  // 👇 Appel clair
  const image = getRandomImage(sport);

  useEffect(() => {
    fetch(`${API_URL}/api/users/levelupdate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        sport: sport,
        xp: xpUpdated,
        subLevel: subLevelUpdated,
        level: levelUpdated,
        sessions: sessionUpd,
        playTime: playUpd,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            updateUser({
              currentLevelID: levelUpdated,
              currentSubLevelID: subLevelUpdated,
              xp: xpUpdated,
              sessions: sessionUpd,
              playTime: playUpd,
            })
          );
          dispatch(addActivityToStore(data.dataActivity.subLevels));
        } else {
          console.log(data);
        }
      });
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Ton avancement !</Text>
        <Text style={styles.subText}>
          Suis tes progrès et découvre à quel point tu es proche du niveau
          suivant.
        </Text>
        <View style={styles.prog}>
          <ProgressStep niv={pourcent} epaisseur={30} largeur={300} />
        </View>
        <View style={styles.textProg}>
          <Text>Niveau {levelmoins}</Text>
          <Text>{pourcent}%</Text>
          <Text>Niveau {levelplus}</Text>
        </View>
        <View style={styles.rewardBox}>
          <FontAwesome
            name="star"
            size={20}
            color="#facc15"
            style={styles.icon}
          />
          <Text style={styles.rewardText}>
            Au prochain exercice, tu gagneras {xp} XP !
          </Text>
        </View>
        <Text style={styles.rec}>Ta prochaine récompense !</Text>
        <Image
          source={{
            uri: image,
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
  rec: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: "underline",
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
    backgroundColor: "#E4F0F4",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    marginTop: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  rewardText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
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
    textAlign: "center",
  },
  textProg: {
    flexDirection: "row",

    bottom: "-12%",
    width: "80%",
    justifyContent: "space-between",
  },
});
