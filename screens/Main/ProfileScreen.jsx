import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Tabnavigation from "../../components/Tabnavigation"; // ajout tabnavigation barre avec les icones
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Welcome");
  };

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

      {/* Profile image */}
      <Image
        source={{
          uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747993035/projectFinDeBatch/front/images/default-profile-female_kn6nlb.png",
        }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>Anna Tomie</Text>
      <Text style={styles.username}>username</Text>

      {/* Stats box poids taille */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="barbell-outline" size={20} color="#555" />
          <View style={styles.statTextBox}>
            <Text style={styles.statLabel}>Poids</Text>
            <Text style={styles.statValue}>77 kg</Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="body-outline" size={20} color="#555" />
          <View style={styles.statTextBox}>
            <Text style={styles.statLabel}>Taille</Text>
            <Text style={styles.statValue}>164 cm</Text>
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
        <Image
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
        />
      </ScrollView>
      
      <View style={styles.xpContainer}>
        <Text style={styles.xpTitle}>XP Gagnés</Text>
        <Text style={styles.xpValue}>+180 XP</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    marginBottom: 30,
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
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  xpContainer: {
  marginTop: 30,
  marginHorizontal: 20,
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
