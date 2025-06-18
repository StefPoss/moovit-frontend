import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Tabnavigation from "../../components/Tabnavigation" // ajout tabnavigation barre avec les icones
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { removeUserToStore } from "../../reducers/userSlice"
import { removeActivityToStore } from "../../reducers/activitySlice"
const { width, height } = Dimensions.get("window")

export default function ProfileScreen({}) {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  console.log("profil -- ", user)
  const navigation = useNavigation()
  const handleLogout = () => {
    dispatch(removeActivityToStore())
    dispatch(removeUserToStore())
    navigation.navigate("Welcome")
  }
  let medalsData

  let natationImages = [
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747826097/projectFinDeBatch/front/images/medals/medal-natation-04_dabzkx.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747811166/projectFinDeBatch/front/images/medals/medal-natation-01_sva2zb.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747747696/projectFinDeBatch/front/images/medals/medal-natation-05_rhqkre.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747747682/projectFinDeBatch/front/images/medals/medal-natation-01_bktbt8.png",
  ]

  let padelImages = [
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747827625/projectFinDeBatch/front/images/medals/medal-padel-04_pspous.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747827083/projectFinDeBatch/front/images/medals/medal-padel-03_j1xbl9.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747826943/projectFinDeBatch/front/images/medals/medal-padel-02_enz2s8.png",
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747827941/projectFinDeBatch/front/images/medals/medal-padel-05_shbhmg.png",
  ]

  if (user.sportPlayed === "Padel") {
    medalsData = padelImages.map((e, i) => {
      return (
        <Image
          source={{
            uri: e,
          }}
          style={styles.badge}
          key={i}
        />
      )
    })
  } else if (user.sportPlayed === "Natation") {
    medalsData = natationImages.map((e, i) => {
      return (
        <Image
          source={{
            uri: e,
          }}
          style={styles.badge}
          key={i}
        />
      )
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back and deconnexion */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Abonnement Premium > Screen Stripe */}
      <View style={styles.premiumSubscribeContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Stripe")
          }}
        >
          <Text style={styles.premiumSubscribeTitle}>Deviens Premium !</Text>
          <Text style={styles.premiumSubscribeValue}>
            profites de dizaines d'avantages
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile image */}
      <Image
        source={{
          //uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747993035/projectFinDeBatch/front/images/default-profile-female_kn6nlb.png",
          uri: user.photoUrl,
        }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{user.username}</Text>

      {/* Stats box poids taille */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="barbell-outline" size={20} color="#555" />
          <View style={styles.statTextBox}>
            <Text style={styles.statLabel}>Poids</Text>
            <Text style={styles.statValue}>{user.weight} kg</Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="body-outline" size={20} color="#555" />
          <View style={styles.statTextBox}>
            <Text style={styles.statLabel}>Taille</Text>
            <Text style={styles.statValue}>{user.height} cm</Text>
          </View>
        </View>
      </View>

      {/* Badges */}
      <Text style={styles.subtitle}>Mes médailles</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.badgesContainer}
      >
        {/* <Image
          source={{
            uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747826097/projectFinDeBatch/front/images/medals/medal-natation-04_dabzkx.png",
          }}
          style={styles.badge}
        />
        <Image
          source={{
            uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747811166/projectFinDeBatch/front/images/medals/medal-natation-01_sva2zb.png",
          }}
          style={styles.badge}
        />
        <Image
          source={{
            uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747747696/projectFinDeBatch/front/images/medals/medal-natation-05_rhqkre.png",
          }}
          style={styles.badge}
        />
        <Image
          source={{
            uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747747682/projectFinDeBatch/front/images/medals/medal-natation-01_bktbt8.png",
          }}
          style={styles.badge}
        /> */}
        {medalsData}
      </ScrollView>

      <View style={styles.xpContainer}>
        <Text style={styles.xpTitle}>XP Gagnés</Text>
        <Text style={styles.xpValue}>{user.xp} XP</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundCrolor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 40,

    username: {
      fontSize: 14,
      color: "#888",
      marginBottom: 20,
      textalign: "center",
    },
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    //marginBottom: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 0,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    color: "#888",
  },
  statTextBox: {
    marginLeft: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  badgesContainer: {
    flexDirection: "row",
  },
  badge: {
    width: width * 0.2,
    height: height * 0.1,
    marginRight: 10,
    borderRadius: 10,
  },
  xpContainer: {
    backgroundColor: "#EFEAFF", // couleur pastel douce
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    marginBottom: height * 0.02,
  },

  xpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },

  xpValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#785BFF", // couleur violette vive pour bien ressortir
  },
  premiumSubscribeContainer: {
    backgroundColor: "#fceace", // couleur pastel douce
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    marginBottom: height * 0.02,
  },

  premiumSubscribeTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },

  premiumSubscribeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#785BFF", // couleur violette vive pour bien ressortir
  },
})
