import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import StaticCard from "../../components/StaticCard";
import {
  SafeAreaView,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function DashBoard(props) {
  // <ActivityCard    //clickable
  //   text=""//texte a afficher dans le bouton
  //   width="150" //long du boutton
  //   height="150" //haut du boutton
  //   backgroundColor="#FCEACE" //gris du figma
  //   url="https://reactnative.dev/img/tiny_logo.png"//url de l'image
  //   color="black"//couleur de la font
  //   fontWeight="700"//fontsize
  // />;

  //  <StaticCard   //NON-clickable
  //     text="user" //texte a afficher dans le bouton
  //     textAlign="left" //affichage du text left/center/right
  //     width="340" //long du boutton
  //     height="70" //haut du boutton
  //     backgroundColor="lightgrey" //couleur du bg
  //     color="green"//couleur de la font
  //     fontWeight="700"//fontsize
  //      />

  const User = useSelector((state) => state.user.value);

  //useEffect pour charger les données au chargement de la page
useEffect(() => 
{
  
  //requete vers le back 
  fetch("http://localhost:3000/api/users/dashboard",
  {
    method: 'POST', // méthode HTTP POST pour envoyer les données
    headers: { 'Content-Type': 'application/json' }, // type de contenu envoyé en JSON
    body: JSON.stringify(
    {
      token:User.token,  // token stocké dans le redux
     
    })
  }).then(r=>r.json()).then(data=>
  {
    console.log(data);
    

  })
 
}, []);



<ActivityCard
  text = ""
  width = "150"//long du boutton
  height = "150" //haut du boutton
  backgroundColor = "#FCEACE" //gris du figma
  url = "https://reactnative.dev/img/tiny_logo.png"
  color = "black"
  fontWeight = "700"
              />
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.container}>
          <StaticCard
            text="user"
            textAlign="left"
            width="340" 
            height="70" 
            backgroundColor="lightgrey" 
            color="green"
          />
          <StaticCard
            color="black"
            fontWeight="700"
            text="amel"
            width="340" 
            height="75" 
            backgroundColor="#C5C4D9" 
            url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"
          />
          <Text style={styles.text}>Training Now</Text>
          <View style={styles.topButton}>
            <ScrollView
              contentContainerStyle={{ padding: 5 }}
              horizontal={true} //permet le scroll horizontal
              showHorizontalScrollIndicator={false} //affiche une barre de scroll
              style={styles.scrollView}
            >
              <ActivityCard
                style={styles.activity}
                text="nico"
                color="yellow"
              />
              <ActivityCard
                style={styles.activity}
                text="Sport"
                backgroundColor="#C5C4D9" //gris du figma
                color="yellow"
                url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"
              />
              <ActivityCard
                style={styles.activity}
                text="Amel"
                backgroundColor="#E9FEE1" //gris du figma
                url=""
              />
            </ScrollView>
          </View>
          <StaticCard
            width="340" //long du boutton
            height="150" //haut du boutton
            backgroundColor="#EF5F8" 
            color="white"
            text="statistic"
            textAlign="left"
          />
          <View style={styles.bottomButton}>
            <ActivityCard style={styles.activity} text="Amel" url="" />
            <StaticCard
              width="200" //long du boutton
              height="150" //haut du boutton
              backgroundColor="#C5C4D9" //gris du figma
              
            />
          </View>
        </View>
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
    width: 400,
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
});
