import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import StaticCard from "../../components/StaticCard";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function DashBoard(props) {

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
    data

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
            title="user"
            width="340" //long du boutton
            height="70" //haut du boutton
            backgroundColor="#FEF5F8" //gris du figma
            textColor="blue"
          />
          <StaticCard
            title="amel"
            width="340" //long du boutton
            height="75" //haut du boutton
            backgroundColor="black" //gris du figma
            textColor="white"
          />
          <Text style={styles.text}>Training Now</Text>
          <View style={styles.topButton}>
            <ScrollView
              contentContainerStyle={{ padding: 5 }}
              horizontal={true} //permet le scroll horizontal
              // showHorizontalScrollIndicator={false} //affiche une barre de scroll
              style={styles.scrollView}
            >
              <ActivityCard style={styles.activity} text="nico" />
              <ActivityCard
                style={styles.activity}
                text="dhfjghkhghlhljimij"
                backgroundColor="#C5C4D9" //gris du figma 
                color="red"
                 url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"

              />
              <ActivityCard
                style={styles.activity}
                text="amel"
                backgroundColor="#E9FEE1" //gris du figma
               url=''
              />
            </ScrollView>
          </View>
          <StaticCard
            width="340" //long du boutton
            height="150" //haut du boutton
            backgroundColor="#FEF5F8" //gris du figma
          />
          <View style={styles.bottomButton}>
            <ActivityCard style={styles.activity} text="amel" url=''/>
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
    // justifyContent: "center",
    alignItems: "center",
    // overflow:'visible',
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
    // overflow: "scroll",
    // flexWrap: "Wrap",
    // flexWrap: "Wrap",
    // borderWidth: 2,
    // width:"100%",
    // height:"100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  activity: {
    padding: "5",
  },
  bottomButton: {
    flexDirection: "row",
  },
});
