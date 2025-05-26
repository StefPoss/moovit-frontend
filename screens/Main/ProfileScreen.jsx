import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StaticCard from "../../components/StaticCard";

export default function ProfileScreen({ navigation }) {
  return (
    // bouton retour à garder 
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête avec bouton retour et titre */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <Ionicons name="settings-outline" size={20} color="black" />
      </View>

      {/* Image de profil à récupérer par la suite avec le back*/}
      <Image
        source={{
          uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747993035/projectFinDeBatch/front/images/default-profile-female_kn6nlb.png",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Anna Tomie</Text>

      {/* Stats durs pour l'instant */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>99 kg</Text>
          <Text style={styles.statLabel}>Poids</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>164 cm</Text>
          <Text style={styles.statLabel}>Taille</Text>
        </View>
      </View>

      {/* Badges simulés */}
      <Text style={styles.subtitle}>Médailles</Text>
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Text>Cardio</Text>
        </View>
        <View style={styles.badge}>
          <Text>Abdos</Text>
        </View>
        <View style={styles.badge}>
          <Text>Assiduité</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold" },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "bold" },
  statLabel: { color: "#666" },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  badges: { flexDirection: "row", gap: 10 },
  badge: {
    backgroundColor: "#EEE",
    borderRadius: 10,
    padding: 10,
    minWidth: 70,
    alignItems: "center",
  },
});

/*import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    name: 'Laura Malloy',
    weight: '48 kg',
    height: '164 cm',
    image: 'https://your-image-url.jpg', // remplace par l'URL réelle
    badges: [
      { title: 'Cardio crusader', icon: require('../assets/cardio.png') },
      { title: 'Plank prodigy', icon: require('../assets/plank.png') },
      { title: 'Calories burned', icon: require('../assets/calories.png') },
    ],
  });

  useEffect(() => {
    // ici on récupère les vraies données depuis le backend
    // exemple avec fetch()
    // fetch('https:/user/profile')
    // .then(res => res.json())
    // .then(data => setUser(data));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      
      <Text style={styles.achievementTitle}>Achievements</Text>
      <View style={styles.badgeContainer}>
        {user.badges.map((badge, index) => (
          <View key={index} style={styles.badgeCard}>
            <Image source={badge.icon} style={styles.badgeIcon} />
            <Text style={styles.badgeText}>{badge.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#fff', paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 10,
  },
  
});*/
