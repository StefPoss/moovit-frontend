import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";
import Button from "../../components/buttons";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/video_splash.mp4")}
        shouldPlay
        isLooping
        resizeMode="cover"
        isMuted
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.overlay}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            Bienvenue dans{"\n"}
            <Text style={styles.brand}>MOOVE IT,</Text>
            {"\n"}
            ton coach de Poche !
          </Text>

          <Text style={styles.subtitle}>
            L'application sportive personnalisée qui réunit{"\n"}
            les utilisateurs près de chez toi.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="S'inscrire"
              onPress={() => navigation.navigate("S'inscrire")}
            />
            <Button
              title="Se connecter"
              onPress={() => navigation.navigate("Se connecter")}
              backgroundColor="transparent"
              textColor="#d6c9ff"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 34,
    color: "#fff",
    fontFamily: "CocomatPro-Regular",
    marginBottom: 12,
  },
  brand: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 30,
    fontFamily: "Manrope-Extralight",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

/*<View style={styles.container}>
      <Video
        source={require("../assets/video.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay // style video
        isLooping
        style={StyleSheet.absoluteFill}
      />

      container: {
    flex: 1,
    backgroundColor: '#000', // fond noir temporaire en attendant la video 
    justifyContent: 'flex-end',
  },
      */
/*import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import Button from '../../components/Button';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/video.mp4')}
        shouldPlay
        isLooping
        resizeMode="cover"
        isMuted
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.overlay}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            Bienvenue dans{'\n'}
            <Text style={styles.brand}>MOOVE IT,</Text>{'\n'}
            ton coach de Poche !
          </Text>

          <Text style={styles.subtitle}>
            L'application sportive personnalisée qui réunit{'\n'}
            les utilisateurs près de chez toi.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Sign up"
              onPress={() => navigation.navigate('SignUp')}
            />
            <Button
              title="Log in"
              onPress={() => navigation.navigate('Login')}
              backgroundColor="transparent"
              textColor="#d6c9ff"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
*/
