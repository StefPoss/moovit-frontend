import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";

// composant principal PlayScreen
export default function PlayScreen() {
  const [duration, setDuration] = useState("5"); // durée choisie par l'utilisateur (en minutes sous forme de texte pour l'instant à 5min)
  const [seconds, setSeconds] = useState(0); // compteur en secondes pour le timer initialisé à 0
  const [running, setRunning] = useState(false); // indique si le timer est en cours ou en pause
  const [started, setStarted] = useState(false); // indique si le timer a été initialisé

  // gestion de l'intervalle du timer
  useEffect(() => { // useEffect est un hook qui réagit à des changements d'états (running en secondes) et 
  // sert à démarrer un timer qui se décrèmente chaque secondes si le timer et en cours (running) et qu'il reste du temps (second >0)
    let interval;
    if (running && seconds > 0) {
      // si le timer tourne et qu'il reste du temps, on décrèmente toutes les secondes
      interval = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    } else if (seconds === 0) {
      // si le temps est écoulé, on arrête le timer
      clearInterval(interval);
      setRunning(false);
    }
    return () => clearInterval(interval); // permet de nettoyer et mettre à jour le timer
  }, [running, seconds]);

  // fonction pour démarrer le timer avec la durée choisie
  const startTimer = () => {
    const parsed = parseInt(duration);
    if (!isNaN(parsed) && parsed > 0) { // vérifie que l'entrée est un nombre valide positif 
      setSeconds(parsed * 60); // converti les minutes en secondes
      setRunning(true); // démarre le useEffect qui va décrémenter seconds
      setStarted(true); //indique que l'utilisateur est passé en mode "comptee à rebours" on cache les inputs en attendant 
    }
  };
  // affichage formaté du temps restant en minutes/secondes
  const formatTime = (s) => {
    const min = Math.floor(s / 60); //on divise le total de sec par 60 pour obtenir des min et Math.floor permet d'arrondir à l'entier inférieur (ex: 1.25 -> 1)
    const sec = s % 60; // cela nous donne les secondes restantes après avoir enlevé les minutes 
    return `${min}:${sec < 10 ? "0" : ""}${sec}`; // nombre de min/ ajpute un 0 devant si <10 (ex: 9 devient 09 et 10 reste 10)
  };

  return (
    <ImageBackground
      source={{
        uri: "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168886/projectFinDeBatch/front/images/activities/padel/padel-photo-042.avif",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Durée entraînement</Text>

        {/* bloc d'entrée de durée si le timer n'est pas encore lancé*/}
        {!started && (
          <>
            <Text style={styles.label}>Entrez la durée (min)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonText}>Lancer</Text>
            </TouchableOpacity>
          </>
        )}
        {/* bloc affiché quand le timer est lancé*/}

        {started && (
          <>
            <Text style={styles.timer}>{formatTime(seconds)}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setRunning(!running)}
            >
              <Text style={styles.buttonText}>
                {running ? "Pause" : "Reprendre"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStarted(false);
                setRunning(false);
                setSeconds(0);
              }}
            >
              <Text style={styles.reset}>Réinitialiser</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: 100,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 15,
  },
  timer: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#785BFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  reset: {
    marginTop: 15,
    color: "#555",
    textDecorationLine: "underline",
  },
});
