import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Video } from 'expo-av'; pour l'instant 

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>
          Bienvenue dans MOOVE IT,{'\n'}
          <Text style={styles.brand}>ton coach de Poche !</Text>
        </Text>

        <Text style={styles.subtitle}>
          L'application sportive personnalisée qui réunit{'\n'}
          les utilisateurs près de chez toi.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fond noir temporaire en attendant la video 
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'CocomatPro-Regular',
    marginBottom: 10,
  },
  brand: {
    fontFamily: 'Manrope-Extralight',
    fontSize: 28,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    fontFamily: 'Manrope-Extralight',
    marginBottom: 30,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpButton: {
    backgroundColor: '#d6c9ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  loginButton: {
    borderColor: '#d6c9ff',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  signUpText: {
    color: '#000',
    fontWeight: '600',
  },
  loginText: {
    color: '#d6c9ff',
    fontWeight: '600',
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
      */