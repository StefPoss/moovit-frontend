import React from "react"
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import Tabnavigation from "../../components/Tabnavigation" // ajout tabnavigation barre avec les icones
const { width, height } = Dimensions.get("window")

export default function StripeScreen() {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  console.log("profil -- ", user)
  const navigation = useNavigation()

  const handleStripeRedirect = () => {
    // STRIPE PROD const url = "https://buy.stripe.com/00wdR82Ds1hg9Lv5Ml3Ru00"
    const url = "https://buy.stripe.com/test_dRm4gB1s29aXfmEcka6c000" // STRIPE TEST
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      {/* Profile image */}
      <Image
        source={{
          //uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747993035/projectFinDeBatch/front/images/default-profile-female_kn6nlb.png",
          uri: user.photoUrl,
        }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>Thomastro choisis ta formule :</Text>
      <Text style={styles.username}>{user.username}</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={[styles.card, { marginBottom: 30 }]}>
        <Text style={styles.label}>Premium</Text>
        <Text style={styles.price}>9,90 €</Text>
        <Text style={styles.period}>/mois</Text>

        <TouchableOpacity style={styles.button} onPress={handleStripeRedirect}>
          <Text style={styles.buttonText}>Souscrire</Text>
        </TouchableOpacity>

        <View style={styles.features}>
          <Text style={styles.feature}>✓ Détection de posture par IA</Text>
          <Text style={styles.feature}>✓ Accès aux capteurs du téléphone</Text>
          <Text style={styles.feature}>✓ Messagerie avec coachs experts</Text>
          <Text style={styles.feature}>✓ Statistiques expertes</Text>
          <Text style={styles.feature}>✓ 10% de réductions en boutique</Text>
        </View>
      </View>

      <View style={[styles.card, { marginBottom: 30 }]}>
        <Text style={styles.label}>Basique</Text>
        <Text style={styles.price}>3,90 €</Text>
        <Text style={styles.period}>/mois</Text>

        <TouchableOpacity style={styles.buttonNotAvailable}>
          <Text style={styles.buttonTextNotAvailable}>Bientôt disponible</Text>
        </TouchableOpacity>

        <View style={styles.features}>
          <Text style={styles.feature}>✓ Accès aux capteurs du téléphone</Text>
          <Text style={styles.feature}>✓ Statistiques avancées</Text>
          <Text style={styles.feature}>✓ 5% de réductions en boutique</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  card: {
    backgroundColor: "#6C5DD3",
    padding: 25,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  price: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  period: {
    color: "#eee",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#6C5DD3",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonNotAvailable: {
    backgroundColor: "#C0C0C0",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonTextNotAvailable: {
    color: "#2C1DA3",
    fontSize: 18,
    fontWeight: "bold",
  },
  features: {
    alignItems: "flex-start",
  },
  feature: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
})
