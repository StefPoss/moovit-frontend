import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
// import ActivityCard from "../../components/ActivityCard"
// import StaticCard from "../../components/StaticCard"
import CardLevelClicable from "../../components/CardLevelClicable";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { API_URL } from "@env";
import { useDispatch } from "react-redux";
import { addUserToStore } from "../../reducers/userSlice";
import { addActivityToStore } from "../../reducers/activitySlice";
import PhotoProfil from "../../components/PhotoProfil";
import ExercisesProgressBar from "../../components/ExercisesProgressBar";
import StatiscticGraphic from "../../components/StatiscticGraphic";
import {FontAwesome5} from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons"
// import Tabnavigation from "../../components/Tabnavigation" // ajout tabnavigation barre avec les icones

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function DashBoard(props) {
  // LE DASHBOARD : affiche les infos user, le fallback photo profil, etc.
  const user = useSelector((state) => state.user.value);
  const activity = useSelector((state) => state.activity.value);
  const dispatch = useDispatch();
  const [nExercices, setNExercices] = useState(5);
  const [dayTime, setDayTime] = useState("Indisponible");
  const [meteo, setMeteo] = useState("Indisponible");
  const [refreshing, setRefreshing] = React.useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  let playTime = 35;
  let sessions = 5;
  let xp = 105;
  console.log(activity);
  // Fonction qui génère une url default 250x250 en fonction du genre
  const getPhotoUrl = (gender) => {
    // Si masculin, profil homme en 250x250
    if (gender === "Masculin")
      return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1748005964/projectFinDeBatch/front/images/default-profile-male_cltqmm.png";
    // Si féminin, profil femme en 250x250
    if (gender === "Féminin")
      return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1747993035/projectFinDeBatch/front/images/default-profile-female_kn6nlb.png";
    // Si non binaire, avatar neutre en 250x250
    if (gender === "Non binaire")
      return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1748005964/projectFinDeBatch/front/images/default-profile-male_exgh99.png";
    // Par défaut, avatar générique 250x250
    return "https://res.cloudinary.com/deuhttaaq/image/upload/c_thumb,w_250,h_250/v1748005964/projectFinDeBatch/front/images/default-profile-male_exgh99.png";
  };

  //useEffect pour charger les données au chargement de la page
  // useEffect(() => {
  //requete vers le back
  // console.log("User is", User)
  // Récupère user + activities depuis l’API
  // Ici, gestion du fallback AVANT le dispatch ! (store toujours clean)
  // Appel l'API, gère la photo profil/fallback AVANT le dispatch, pour que le store soit toujours clean
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

        // Si la photo de la DB contient "default-profile", on force le fallback redimensionné selon le genre
        if (
          photoUrl &&
          photoUrl.includes("default-profile") &&
          !photoUrl.includes("w_250")
        ) {
          photoUrl = getPhotoUrl(data.dataUser.gender);
        }

        let newUser = {
          token: data.dataUser.token,
          photoUrl,
          username: data.dataUser.username,
          name: data.dataUser.name,
          admin: false,
          sportPlayed: data.dataUser.sportPlayed[0],
          titleLevel: data.dataLevel.title,
          xp: data.dataUser.xp,
          level: data.dataUser.level,
          gender: data.dataUser.gender || "",
          currentLevelID: data.dataUser.currentLevelID,
          currentSubLevelID: data.dataUser.currentSubLevelID,
          height: data.dataUser.height,
          weight: data.dataUser.weight,
        };
        dispatch(addUserToStore(newUser));
        dispatch(addActivityToStore(data.dataLevel.subLevels));
        let dailyTime = data.dataUser.form.dayTime;
        if (dailyTime === "4 h/semaine") setDayTime("45 minutes");
        else if (dailyTime === "8 h/semaine ou plus") setDayTime("1 heure");
        else if (dailyTime === "15 min/jour") setDayTime("15 minutes");
        else if (dailyTime === "30 min/jour") setDayTime("30 minutes");
        setMeteo(data.dataMeteo);
      });
  };

  // 1er appel : charge le dashboard au premier render
  useEffect(() => {
    fetchUserData();
    //console.log("activity subLevels ",activity.length);
  }, []);

  // Fonction Pull-to-Refresh pour MAJ user/activities
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserData().finally(() => {
      setRefreshing(false);
      setAnimationKey(Date.now()); // force le refresh ProgressBar
    });
    // Log l’heure du refresh pour debug
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");
    //console.log(`${hh}H${mm}mn${ss}s`)
  }, []);

  //console.log("user is", user)

  // Création du carousel de cartes d’activités > sécurisation du .map car
  // activity peut être undefined (par exemple avant d’être fetch du back ou de Redux
  // En forçant (Array.isArray(activity) ? activity : []), on garantis que :
  // Si activity est bien un tableau, on l'utilise tel quel
  // Si c'est undefined ou un objet ou autre chose, on mappe sur un tableau vide, donc pas d’erreur
  // on a juste pas de cartes à afficher
  let levelsCards = (Array.isArray(activity) ? activity : []).map((e, i) => (
    <CardLevelClicable
      key={i}
      style={styles.activity}
      text={e.title}
      backgroundColor="#C5C4D9"
      color="yellow"
      url={e.image}
      fill={true}
      linkTo="LevelScreen"
      // keyNum={key}
    />
  ));

  // Log l'URL utilisée pour la photo profil
  // console.log(
  //   "Dashboard envoie photoUrl à PhotoProfil:",
  //   user.photoUrl,
  //   "| gender:",
  //   user.gender
  // )

  // Choix de l'URL à passer au composant PhotoProfil :
  // - Si l’API renvoie une photo → on prend ça
  // - Sinon → on génère la bonne URL via getPhotoUrl(user.gender)
  const profileUrl =
    user.photoUrl && user.photoUrl !== ""
      ? user.photoUrl
      : getPhotoUrl(user.gender);

  // RENDER : SafeArea + ScrollView + toutes les cartes
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            {/* PROFILE CARD */}
            <View style={styles.profilContainer}>
              <PhotoProfil photoUrl={user.photoUrl} />
              <View style={styles.textProfilContainer}>
                <Text style={[styles.profilText, { fontSize: 20 }]}>
                  Bonjour {user.username}
                </Text>
                <Text style={styles.profilText}>
                  Prêt pour un nouveau challenge ?
                </Text>
              </View>
            </View>

            {/*PROGRESS CARD */}
            <View style={styles.progressCard}>
              <View style={styles.progressLeftBlock}>
                <Text style={styles.progressTitle}>
                  Niveau actuel : {user.currentLevelID}.{user.currentSubLevelID}
                </Text>
                <Text style={styles.progressSteps}>
                  {user.currentSubLevelID}/{activity.length} exercices complétés
                </Text>
              </View>
              <View style={styles.progressRightBlock}>
                <ExercisesProgressBar
                  key={animationKey} // change la key dynamiquement sur refresh pour forcer le rerender et donc l'animation
                  value={(user.currentSubLevelID * 100) / activity.length}
                ></ExercisesProgressBar>
              </View>
            </View>

            <Text style={styles.text}>Mon Actu</Text>
            {/* CAROUSEL D'ACTIIVTIES */}
            <View style={styles.topButton}>
              <ScrollView
                contentContainerStyle={{ padding: 5 }}
                horizontal={true} //permet le scroll horizontal
                // showHorizontalScrollIndicator={false} //affiche une barre de scroll
                style={styles.scrollView}
              >
                {levelsCards}
              </ScrollView>
            </View>
            {/* STATISTIQUES */}
            <StatiscticGraphic
              playTime={playTime}
              sessions={sessions}
              xp={user.xp}
            ></StatiscticGraphic>

            <View style={styles.bottomButton}>
              {/* TEMPS PAR JOUR */}
              <View style={styles.dayTrainingContainer}>
                <View style={styles.textbottomButtonContainer}>
                  <View style={styles.trainingRow}>
                    <Text style={[styles.progressText, { fontSize: 20 }]}>
                      Training
                    </Text>
                    <FontAwesome5
                      name="dumbbell"
                      size={18}
                      color="#black"
                      style={{ marginLeft: 10, paddingTop: 10 }}
                    />
                  </View>
                  <Text style={styles.progressText}>{dayTime}</Text>
                </View>
              </View>

              {/* METEO */}
              <View style={styles.meteoContainer}>
                <View style={styles.textbottomButtonContainer}>
                  <Text style={[styles.profilText, { fontSize: 20 }]}>
                    {meteo}
                  </Text>
                  <Text style={styles.profilText}>{meteo}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Intégration de la Tabnavigation ici à modifier */}
          {/* <Tabnavigation /> */}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#555555",
    fontSize: 20,
    marginLeft: -250,
  },
  topButton: {
    flex: 0,
    flexDirection: "row",
  },
  activity: {
    padding: 0,
  },
  bottomButton: {
    flexDirection: "row",
  },
  profilContainer: {
    width: "90%",
    height: 90,
    backgroundColor: "ffffff",
    borderRadius: 15,
    marginRight: 5,
    margin: 5,
    padding: 10,
    flexDirection: "row",
  },
  profilText: {
    color: "black",
    marginTop: 5,
    fontWeight: "500",
    borderRadius: 15,
  },
  progressCard: {
    width: "90%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7D6BB3",
    borderRadius: 15,
    marginRight: 5,
    margin: 5,
    padding: 10,
    alignSelf: "center",
  },
  progressLeftBlock: {
    flex: 1,
    justifyContent: "center",
  },
  progressTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    fontWeight: "600",
    marginBottom: 4,
  },
  progressText: {
    color: "ffffff",
    marginTop: 5,
    fontWeight: "500",
    justifyContent: "center",
  },
  progressSteps: {
    color: "#fff",
    fontSize: 15,
    opacity: 0.85,
  },
  progressRightBlock: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dayTrainingContainer: {
    backgroundColor: "#FFF4E2",
    width: "43%", //long du boutton
    height: 150, //haut du boutton
    borderRadius: 15, //arrondi des angles
    borderColor: "#cbb7ff",
    margin: 5,
  },
  textbottomButtonContainer: {
    // backgroundColor: "#f9f9f9",
    //borderColor: "#cbb7ff",
    // borderWidth: 5,
    //borderRadius: 20,
    padding: 15,
    margin: 15,
    alignItems: "center",
  },

  trainingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  meteoContainer: {
    backgroundColor: "#E4F0F4",
    width: "40%", //long du boutton
    height: 150, //haut du boutton
    borderRadius: 15, //arrondi des angles
    margin: 5,
  },
});
