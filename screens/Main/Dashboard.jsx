import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import StaticCard from "../../components/StaticCard";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from "@env"
import { useDispatch } from "react-redux"
import { addUserToStore } from "../../reducers/userSlice"
import { addActivityToStore } from "../../reducers/activitySlice"
import PhotoProfil from "../../components/PhotoProfil";
import ExercisesProgressBar from "../../components/ExercisesProgressBar";
import StatiscticGraphic from "../../components/StatiscticGraphic";

import { Ionicons } from "@expo/vector-icons";

import Tabnavigation from "../../components/Tabnavigation"; // ajout tabnavigation barre avec les icones


//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function DashBoard(props) {




  const User = useSelector((state) => state.user.value);
  const Activity = useSelector((state) => state.activity.value);
  const dispatch = useDispatch()
  const [nExercices, setNExercices] = useState(8);
  const [dayTime, setDayTime] = useState("Indisponible");
  const [meteo, setMeteo] = useState("Indisponible");
  let playTime = 35
  let sessions = 5
  let xp = 105


  //useEffect pour charger les données au chargement de la page
useEffect(() => 
{
  
  
  
  //requete vers le back 
  fetch(`${API_URL}/api/users/dashboard`,
  {
    method: 'POST', // méthode HTTP POST pour envoyer les données
    headers: { 'Content-Type': 'application/json' }, // type de contenu envoyé en JSON
    body: JSON.stringify(
    {
      token:User.token,  // token stocké dans le redux
     
    })
  }).then(r=>r.json()).then(data=>
  {
    //console.log(data);
    
    if(data.result)
    {
      let newUser = 
      {
        token: data.dataUser.token,
        photoUrl:  data.dataUser.photoUrl,
        username:  data.dataUser.username,
        admin: false,
        sportPlayed:  data.dataUser.sportPlayed[0],
        xp:  data.dataUser.xp,
        level:  data.dataUser.level,
      }
      dispatch(addUserToStore(newUser))
      dispatch(addActivityToStore(data.dataLevel.subLevels))
      console.log(data.dataMeteo);
      let dailyTime = data.dataUser.form.dayTime
      if(dailyTime==="4 h/semaine")
      {
        setDayTime("45 minutes")
      }
      else if(dailyTime==="8 h/semaine ou plus")
      {
        setDayTime("1 heure")
      }
      else if(dailyTime==="15 min/jour")
      {
        setDayTime("15 minutes")
      }
      else if(dailyTime==="30 min/jour")
      {
        setDayTime("30 minutes")
      }

      setMeteo(data.dataMeteo)




    }
  })


 
}, []);

let levelsCards = Activity.map((e, i)=>
{
  return <ActivityCard
                key={i}
                style={styles.activity}
                text={e.title}
                backgroundColor="#C5C4D9" //gris du figma
                color="yellow"
                url={e.image}
              />
})






  

  <ActivityCard
    text=""
    width="150" //long du boutton
    height="150" //haut du boutton
    backgroundColor="#FCEACE" //gris du figma
    url="https://reactnative.dev/img/tiny_logo.png"
    color="black"
    fontWeight="700"
  />;


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.container}>
          <StaticCard
            text="user"
            textAlign="left"
            width="340"
            height="70"
            backgroundColor="lightgrey" />
         
          {/* <StaticCard
            text="aaa"
            textAlign="center"
            width="340" 
            height="70" 
            backgroundColor="lightgrey" 

            color="green"
          /> */}
          <View style={styles.profilContainer}>
             <PhotoProfil photoUrl={"https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1748005964/projectFinDeBatch/front/images/default-profile_cltqmm.png"}></PhotoProfil>
             <View style={styles.textProfilContainer}>
                <Text style={[styles.profilText, { fontSize: 20 }]}  >Bonjour {User.username}</Text>
                <Text style={styles.profilText}>ready for challenge?</Text>
             </View>
          </View>

           <View style={[styles.profilContainer, {backgroundColor:"#C5C4D9"}]}>
             <View style={styles.textProfilContainer}>
                <Text style={[styles.progressText, { fontSize: 20 }]}  >Niveau de progression</Text>
                <Text style={styles.progressText}>{nExercices}/10 Exercises completés</Text>
             </View>
              <ExercisesProgressBar value={nExercices*10}></ExercisesProgressBar>
          </View>

         
          
          {/* <StaticCard
            color="black"
            fontWeight="700"
            text="amel"
            width="340"
            height="75"
            backgroundColor="#C5C4D9"
            url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"
          /> */}
          <Text style={styles.text}>Training Now</Text>
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
          <StatiscticGraphic playTime={playTime} sessions={sessions} xp={xp}></StatiscticGraphic>
         
          {/* <StaticCard
            width="340" //long du boutton
            height="150" //haut du boutton
            backgroundColor="#EF5F8"
            color="white"
            text="statistic"
            textAlign="left"
          /> */}
          <View style={styles.bottomButton}>



            <ActivityCard style={styles.activity} text="Amel" url="" />


            <View style={styles.dayTrainingContainer}>
               <View style={styles.textbottomButtonContainer}>
                <Text style={[styles.progressText, { fontSize: 20 }]}  >Training</Text>
                <Text style={styles.progressText}>{dayTime}</Text>
              </View>
            </View>

             <View style={styles.meteoContainer}>
               <View style={styles.textbottomButtonContainer}>
                <Text style={[styles.profilText, { fontSize: 20 }]}  >{meteo}</Text>
                <Text style={styles.profilText}>{meteo}</Text>
              </View>
            </View>

           
          </View>
        </View>
        {/* Intégration de la Tabnavigation ici à modifier */}
        <Tabnavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FEF5F8",
    justifyContent: "center",
    alignItems: "center",
    width:"100%",
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
  profilContainer:
  {
    width:350,
    height:90,
    backgroundColor:"lightgrey",
    borderRadius: 15,
    marginRight: 5,
    margin: 5,
    padding: 5,
    flexDirection:"row",

  },
  profilText:
  {
    color:"green",
    marginTop: 5,
    fontWeight: "500",
   


  },
  progressText:
  {
    color:"black",
    marginTop: 5,
    fontWeight: "500",
   


  },
  dayTrainingContainer:
  {
    backgroundColor:"#FCEACE",
     width: "170", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
     margin: 5,
  },
  textbottomButtonContainer:
  {
    alignItems:"center",
    paddingTop:40,

  },
  meteoContainer:
  {
    backgroundColor:"#C5C4D9",
     width: "170", //long du boutton
    height: "150", //haut du boutton
    borderRadius: 15, //arrondi des angles
     margin: 5,

  }
});
