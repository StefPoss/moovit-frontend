import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import LottieView from "lottie-react-native"

export default function StripeScreen() {
  const [email, setEmail] = useState("")
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Abonnement Premium via Stripe</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#6C5DD3",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#A18CF3",
    marginBottom: 20,
  },
  cloud: {
    width: 150,
    height: 150,
  },
})
