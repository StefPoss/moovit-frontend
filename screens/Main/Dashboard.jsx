import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import CardLevelClicable from "../../components/CardLevelClicable";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { API_URL } from "@env";
import { useDispatch } from "react-redux";
import { addUserToStore } from "../../reducers/userSlice";
import { addActivityToStore } from "../../reducers/activitySlice";
import PhotoProfil from "../../components/PhotoProfil";
import ExercisesProgressBar from "../../components/ExercisesProgressBar";
import { FontAwesome5 } from "@expo/vector-icons";
import meteoIcons from "../../data/meteoIcons.json";
import MooveItFunChart from "../../components/MooveItFunChart";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


// ========== LE DASHBOARD PRINCIPAL ==========


export default function DashBoard(props) {
  // User / activity récupérés via Redux
  const user = useSelector((state) => state.user.value);
  const activity = useSelector((state) => state.activity.value);
  const dispatch = useDispatch();
  const [dayTime, setDayTime] = useState("Indisponible");
  const [meteo, setMeteo] = useState("Indisponible");
  const [meteoIcon, setMeteoIcon] = useState("?");
  const [refreshing, setRefreshing] = React.useState(false);
  const [animationKey, setAnimationKey] = useState(0);



  // Fonction qui génère la bonne URL de fallback selon le genre
  const getPhotoUrl = (gender) => {
    if (gender === "Masculin")
      return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1748005964/projectFinDeBatch/front/images/default-profile-male_cltqmm.png";
    if (gender === "Féminin")
      return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1747993035/projectFinDeBatch/front/images/default-profile-female_kn6nlb.png";
    if (gender === "Non binaire")
      return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1748005964/projectFinDeBatch/front/images/default-profile-male_exgh99.png";
    // Par défaut, avatar générique 250x250
    return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1748005964/projectFinDeBatch/front/images/default-profile-male_exgh99.png";
  };

  // Récupère user + activities depuis l’API, fallback sur l’avatar profil selon genre, etc.
  const fetchUserData = () => {
    return fetch(`${API_URL}/api/users/dashboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        let photoUrl = data.dataUser.photoUrl;
        if (
          photoUrl &&
          photoUrl.includes("default-profile") &&
          !photoUrl.includes("w_250")
        ) {
          photoUrl = getPhotoUrl(data.dataUser.gender);
        }
        // console.log("ora ", data.dataUser.stats);

        let newUser = {
          token: data.dataUser.token,
          photoUrl,
          username: data.dataUser.username,
          name: data.dataUser.name,
          admin: false,
          sportPlayed: data.dataUser.sportPlayed[0].title,
          titleLevel: data.dataLevel.title,
          xp: data.dataUser.xp,
          gender: data.dataUser.gender || "",
          currentLevelID: data.dataUser.currentLevelID,
          currentSubLevelID: data.dataUser.currentSubLevelID,
          height: data.dataUser.height,
          weight: data.dataUser.weight,
          sessions: data.dataUser.stats.nbSessions,
          playTime: data.dataUser.stats.totalTime,
        };
        dispatch(addUserToStore(newUser));
        dispatch(addActivityToStore(data.dataLevel.subLevels));
        let dailyTime = data.dataUser.form.dayTime;
        if (dailyTime === "4 h/semaine") setDayTime("45 minutes");
        else if (dailyTime === "8 h/semaine ou plus") setDayTime("1 heure");
        else if (dailyTime === "15 min/jour") setDayTime("15 minutes");
        else if (dailyTime === "30 min/jour") setDayTime("30 minutes");
        setMeteo(data.dataMeteo);
        let Icon = meteoIcons.find((entry) => entry.desc === data.dataMeteo);
        setMeteoIcon(Icon.icon);
      });
  };

  // Au premier render, charge les données user/activity
  useEffect(() => {
    fetchUserData();
  }, []);

  // Pull-to-refresh pour MAJ user/activities + force anim bar de progression
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserData().finally(() => {
      setRefreshing(false);
      setAnimationKey(Date.now()); // force le refresh ProgressBar
    });

  }, []);


  let levelsCards = (Array.isArray(activity) ? activity : []).map((e, i) => {
    let opa;
    let direction;
    user.currentSubLevelID < i ? (opa = 0.5) : (opa = 1); //regle l'opacité des carte clickable  (valeur stoké dans la varriable opa)
    user.currentSubLevelID < i
      ? (direction = "TabNavigator") //redirection des cartes si grisé  (var stokage direction)
       // : (direction = "Play"); // redirection des cartes vers levelScreen
       : (direction = "HistoryPlay"); // redirection des cartes vers levelScreen

    let bgCol;
    i === 0 || i === 3 || i === 6 || i === 9 //si l'index est 0/3/6/9 (valeur stoké dans la varriable bgCol)
      ? (bgCol = "#c5bdf5") //applique cette couleur
      : i === 1 || i === 4 || i === 7 || i === 10 //sinon si c'est 1/4/7/10
      ? (bgCol = "#f3c0e7") //applique cette couleur
      : i === 2 || i === 5 || i === 8 || i === 11 //sinon si c'est 2/5/8/11
      ? (bgCol = "#c7deff") //applique celle ci
      : (bgCol = "#C5C4D9"); //sinon applique celle la

    return (
      <CardLevelClicable
        key={i}
        style={styles.activity}
        text={e.title}
        backgroundColor={bgCol}
        color="white"
        url={e.image}
        fill={true}
        opacity={opa}
        linkTo={direction}
        subLevelSent={e.subLevelID}

        //  linkTo={"play"}
      />
    );
  });

  // Fallback profil si pas de photo DB
  const profileUrl =
    user.photoUrl && user.photoUrl !== ""
      ? user.photoUrl
      : getPhotoUrl(user.gender);

  // ========== RENDER PRINCIPAL DU DASHBOARD ==========

  return (
    <SafeAreaProvider>
      <ScrollView>
        <SafeAreaView style={styles.fullScreen} edges={["top"]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            {/* Carte profil */}
            <View style={styles.cardProfile}>
              <PhotoProfil photoUrl={profileUrl} />
              <View style={styles.textProfilContainer}>
                <View style={{ padding:4 }}>
                  <Text style={[styles.profilText, { fontSize: 20 }]}>
                    Bonjour {user.name}
                  </Text>
                  <Text
                    style={[
                      styles.profilText,
                      { fontSize: 15 },
                      { color: "grey" },
                      { fontStyle: "italic" },
                      { marginLeft: 8 },
                      { marginTop: 5 },
                    ]}
                  >
                    ({user.username})
                  </Text>
                </View>
                <Text style={styles.profilText}>
                  Prêt pour un nouveau challenge ?
                </Text>
              </View>
            </View>

            {/* Progression (niveau actuel, cercle de progression à droite) */}
            <View style={styles.cardProgress}>
              <View style={{ flex: 2, justifyContent: "center",marginTop:"2%",marginRight:"-15%" }}>
                <Text style={styles.progressTitle}>
                  Niveau actuel :
                  <Text style={styles.progressTitle}>
                    &nbsp;{user.currentLevelID}.{user.currentSubLevelID}
                  </Text>
                </Text>
                <Text style={styles.progressSteps}>
                  {user.currentSubLevelID}/{activity.length} exercices complétés
                </Text>
              </View>

              <View style={styles.progressRightBlock}>
                <ExercisesProgressBar
                  key={animationKey}
                  value={(user.currentSubLevelID * 100) / activity.length}
                />
              </View>
            </View>

            {/* Carousel d'activités (niveaux) */}
            <View style={styles.cardCarousel}>
              <ScrollView
                contentContainerStyle={{ padding: 0 }}
                horizontal={true} //reglage horizontal du carousel
                showsHorizontalScrollIndicator={false} //enleve le curseur de defilement du carousel horizontal
                style={styles.scrollView}
              >
                {levelsCards}
              </ScrollView>
            </View>


            <MooveItFunChart
              totalTime={user.playTime}
              exercises={user.sessions}
              xp={user.xp}
            />
            <View style={styles.bottomRow}>
              <View style={styles.cardTraining}>
                <FontAwesome5
                  name="dumbbell"
                  size={24}
                  color="#363255"
                  style={{ marginBottom: 0 }}
                />
                <Text style={styles.trainingTitle}>Training</Text>
                <Text style={styles.trainingText}>{dayTime}</Text>
              </View>
              <View style={styles.cardMeteo}>
                <Text style={styles.meteoIcon}>{meteoIcon}</Text>
                <Text style={styles.meteoText}>{meteo}</Text>
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

// ==================== STYLES FLAT CLEAN + COULEURS HARMONISÉES ====================

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#f9f9f9", // fond page très clair
  },
  scrollContent: {
    paddingVertical: 10,
    paddingBottom: 70, // laisse place à la tab bar
    alignItems: "center",
    minHeight: "100%",
  },
  cardProfile: {
    width: width * 0.92,
    height:height*0.09,
    backgroundColor: "#fff", // blanc pur, démarque la card profil
    borderRadius: 16,
    marginBottom: 6,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "0",
    
  },
  textProfilContainer: {
    marginLeft: 12,
    justifyContent: "center",
  },
  profilText: {
    color: "#262626",
    fontWeight: "500",
    borderRadius: 15,
  },
  cardProgress: {
    width: width*0.92,
    height:height*0.1,
    backgroundColor: "#7D6BB3", // violet charte, flat
    borderRadius: 16,
    marginBottom: 0,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  progressTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
  },
  progressValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 0,
  },
  progressSteps: {
    color: "#E4F0F4",
    fontSize: 15,
    opacity: 0.92,
  },
  progressRightBlock: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop:"7%",
  },

  cardCarousel: {
    width: width*1,
    backgroundColor: "#ffffff", // bleu clair charte
    borderRadius: 16,
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  scrollView: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0,
  },
  activity: {
    padding: 0,
  },
  cardStats: {
    width: "92%",
    backgroundColor: "#363255", // violet foncé stats
    borderRadius: 16,
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  statsTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
  },
  statsLabel: {
    color: "#CFDED3",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  statsValue: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 2,
  },
  xpCongrats: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#CFDED3", // vert pastel = contraste max sur fond foncé
    marginTop: 10,
    marginbottom: 0,
  },
  bottomRow: {
    flex: 1,
    flexDirection: "row",
    width: width*0.92,
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 0,
    alignItems: "stretch",
    height: height*0.17, // Ajouté pour que le bloc prenne tout l’espace disponible
  },
  cardTraining: {
    flex: 1,
    backgroundColor: "#e3dafb", // beige charte, soft FFF4E2
    borderRadius: 16,
    padding: 2,
    marginRight: 7,
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  trainingInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    width: "80%",
    height: "80%",
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 2,
    textAlign: "center",
    width: "100%",
  },
  trainingText: {
    fontSize: 15,
    color: "#262626",
    marginTop: 6,
    textAlign: "center",
    width: "100%",
  },
  cardMeteo: {
    flex: 1,
    backgroundColor: "#eef3fa", // vert pastel UI kit CFDED3
    borderRadius: 30, // changement radius et taille pour que le bloc méteo soit plus grand
    padding: 0,
    marginLeft: 7,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    marginTop: 10, // Ajouté
    marginBottom: 10,
  },
  meteoInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    width: "100%",
  },
  meteoIcon: {
    fontSize: 40,
    textAlign: "center",
    width: "100%",
    marginBottom: 4,
  },
  meteoText: {
    fontSize: 15,
    color: "#363255",
    textAlign: "center",
    width: "100%",
    marginTop: 2,
  },
});
