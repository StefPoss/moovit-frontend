import { View, Text, ScrollView, StyleSheet } from "react-native"
import ActivityCard from "../../components/ActivityCard"
import StaticCard from "../../components/StaticCard"
import ProgressBarCircular from "../../components/ProgressBarCircular"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

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
          <ProgressBarCircular
            style={styles.activity}
            levelTitle="Niveau de progression"
            completedSteps={8}
            totalSteps={10}
            width={340}
            height={70}
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
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 0,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  leftBlock: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  steps: {
    color: "#fff",
    fontSize: 15,
    opacity: 0.85,
  },
  rightBlock: {
    width: 38,
    alignItems: "center",
    justifyContent: "center",
  },
})
