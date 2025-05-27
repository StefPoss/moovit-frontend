import React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native"
import ActivityCard from "../../components/ActivityCard"
import StaticCard from "../../components/StaticCard"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API_URL } from "@env"
import { useDispatch } from "react-redux"
import { addUserToStore } from "../../reducers/userSlice"
import { addActivityToStore } from "../../reducers/activitySlice"
import PhotoProfil from "../../components/PhotoProfil"
import ExercisesProgressBar from "../../components/ExercisesProgressBar"
import StatiscticGraphic from "../../components/StatiscticGraphic"
import { AsyncStorage } from "react-native"

import { Ionicons } from "@expo/vector-icons"

import Tabnavigation from "../../components/Tabnavigation" // ajout tabnavigation barre avec les icones

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function DashBoard(props) {
  const User = useSelector((state) => state.user.value)
  const activity = useSelector((state) => state.activity.value)
  const dispatch = useDispatch()
  const [nExercices, setNExercices] = useState(8)
  const [dayTime, setDayTime] = useState("Indisponible")
  const [meteo, setMeteo] = useState("Indisponible")
  let playTime = 35
  let sessions = 5
  let xp = 105
  // console.log("activity is", activity)
  // console.log("rendering dashboard")

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  //useEffect pour charger les données au chargement de la page
  useEffect(() => {
    //requete vers le back
    // console.log("User is", User)
    fetch(`${API_URL}/api/users/dashboard`, {
      method: "POST", // méthode HTTP POST pour envoyer les données
      headers: { "Content-Type": "application/json" }, // type de contenu envoyé en JSON
      body: JSON.stringify({
        token: User.token, // token stocké dans le redux
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("data is", data)

        if (data.result) {
          let newUser = {
            token: data.dataUser.token,
            photoUrl: data.dataUser.photoUrl,
            username: data.dataUser.username,
            admin: false,
            sportPlayed: data.dataUser.sportPlayed[0],
            xp: data.dataUser.xp,
            level: data.dataUser.level,
          }
          dispatch(addUserToStore(newUser))
          dispatch(addActivityToStore(data.dataLevel.subLevels))
          // console.log("activity is", activity)
          console.log("data is", data.dataLevel.subLevels)
          // console.log(data)
          let dailyTime = data.dataUser.form.dayTime
          if (dailyTime === "4 h/semaine") {
            setDayTime("45 minutes")
          } else if (dailyTime === "8 h/semaine ou plus") {
            setDayTime("1 heure")
          } else if (dailyTime === "15 min/jour") {
            setDayTime("15 minutes")
          } else if (dailyTime === "30 min/jour") {
            setDayTime("30 minutes")
          }

          setMeteo(data.dataMeteo)
        }
      })
  }, [])

  let levelsCards = (activity || [])?.map((e, i) => (
    <ActivityCard
      key={i}
      style={styles.activity}
      text={e.title}
      backgroundColor="#C5C4D9"
      color="yellow"
      url={e.image}
    />
  ))

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
              <PhotoProfil photoUrl={User.photoUrl}></PhotoProfil>
              <View style={styles.textProfilContainer}>
                <Text style={[styles.profilText, { fontSize: 20 }]}>
                  Bonjour {User.username}
                </Text>
                <Text style={styles.profilText}>
                  Prêt pour un nouveau challenge ?
                </Text>
              </View>
            </View>

            {/*PROGRESS CARD */}
            <View style={styles.progressCard}>
              <View style={styles.progressLeftBlock}>
                <Text style={styles.progressTitle}>{User.level}</Text>
                <Text style={styles.progressSteps}>
                  {nExercices}/10 exercices complétés
                </Text>
              </View>
              <View style={styles.progressRightBlock}>
                <ExercisesProgressBar
                  value={nExercices * 10}
                ></ExercisesProgressBar>
              </View>
            </View>

            <Text style={styles.text}>Training Now</Text>
            {/* CAROUSEL D'ACTIIVTIES */}
            <View style={styles.topButton}>
              <ScrollView
                contentContainerStyle={{ padding: 5 }}
                horizontal={true} //permet le scroll horizontal
                showHorizontalScrollIndicator={false} //affiche une barre de scroll
                style={styles.scrollView}
              >
                {levelsCards}
              </ScrollView>
            </View>
            {/* STATISTIQUES */}
            <StatiscticGraphic
              playTime={playTime}
              sessions={sessions}
              xp={xp}
            ></StatiscticGraphic>

            <View style={styles.bottomButton}>
              <View style={styles.dayTrainingContainer}>
                <View style={styles.textbottomButtonContainer}>
                  <Text style={[styles.progressText, { fontSize: 20 }]}>
                    Training
                  </Text>
                  <Text style={styles.progressText}>{dayTime}</Text>
                </View>
              </View>

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
  )
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
    color: "grey",
    fontSize: 20,
    marginLeft: -170,
  },
  topButton: {
    flex: 0,
    flexDirection: "row",
  },
  activity: {
    padding: "5",
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
    color: "#555555",
    marginTop: 5,
    fontWeight: "500",
  },
  progressCard: {
    width: "90%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9775f0",
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
    backgroundColor: "#FCEACE",
    width: "170", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
    margin: 5,
  },
  textbottomButtonContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  meteoContainer: {
    backgroundColor: "#C5C4D9",
    width: "170", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
    margin: 5,
  },
})
