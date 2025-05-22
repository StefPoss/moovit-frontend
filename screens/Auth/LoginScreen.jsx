import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import Button from "../../components/buttons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex pour valider l'email avec @ obligatoire au moins 1 caractère sauf espace
    if (!emailRegex.test(email)) {
      // si l'email ne correspond pas au format défini par regex alors...
      setEmailError("Email invalide");
    } else {
      setEmailError(""); // sinon on efface l'erreur
      console.log("Connexion réussie");
      // navigation ou appel API ici vers le backend
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
        keyboardVerticalOffset={80}
      >
        {/* Bouton retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>
          Bienvenue dans <Text style={styles.brand}>MOOVE it</Text>
          {"\n"}
          ton coach sportif de poche !
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              placeholder="Entrez votre email"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError !== "" && (
              <Text style={{ color: "red", marginTop: 4, marginLeft: 4 }}>
                {emailError}
              </Text>
            )}
            <View style={styles.inputRow}>
              <TextInput
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#aaa"
                secureTextEntry={!passwordVisible}
                style={styles.inputText}
                value={password} // pour le state
                onChangeText={setPassword}
              />

              <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#777"
                />
              </Pressable>
            </View>

            <Button
              title="Se connecter"
              onPress={handleLogin}
              backgroundColor="#cbb7ff"
              textColor="#000"
            />
          </View>
        </View>
        {/* Boutons sociaux sans fonctionnalité pour l'instant */}
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#000" />
          <Text style={styles.socialText}>Continuer avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={20} color="#000" />
          <Text style={styles.socialText}>Continuer avec Apple</Text>
        </TouchableOpacity>

        {/* Liens bas de page à voir si on créer un link vers une nouvelle page */}
        <Text style={styles.footer}>
          Pas encore inscrit ?{"\n"}
          <Text style={styles.link}>username/ mot de passe oublié ?</Text>
        </Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#f9f9f9", // fond gris clair
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    width: "100%",
    marginBottom: 40,
  },

  /*form: {
  gap: 50,
},*/

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 90,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "CocomatPro-Regular",
    marginBottom: 60,
    paddingTop: 20,

    color: "#000",
  },
  brand: {
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
    fontFamily: "Manrope-Extralight",
  },
  input: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: "Manrope-Extralight",
  },
  inputRow: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    //flex: 1,
    fontFamily: "Manrope-Extralight",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "CocomatPro-Regular",
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Manrope-Extralight",
    color: "#444",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
