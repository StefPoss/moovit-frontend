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
} from "react-native"; // import des composants react native
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import Button from "../../components/buttons";

export default function SignupScreen({ navigation }) {
  // état pour afficher ou cacher le mot de passe
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(""); // état pour gérer la valeur du champ email avec initialisation
  const [emailError, setEmailError] = useState("");

  // si l'email est invalid afficher le message d'erreur
  const handleSignIn = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex pour valider l'email avec @ obligatoire au moins 1 caractère sauf espace
    if (!emailRegex.test(email)) {
      // si l'email ne correspond pas au format défini par regex alors...
      setEmailError("Email invalide");
    } else {
      setEmailError(""); // sinon on efface l'erreur
      console.log("Inscription réussie");
      // navigation ou appel API ici vers le backend
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Bouton retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      {/* Titre */}
      <Text style={styles.title}>Créer votre compte</Text>
      {/* Bloc formulaire */}
      <View style={styles.form}>
        {/* Email */}
        <View style={styles.input}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.inputField} // style appliqué uniquement sur le champs du texte
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password */}
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
            style={styles.inputField}
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={20}
              color="#777"
            />
          </Pressable>
        </View>

        {/* Sign in avec Button importé du composant*/}
        <Button
          title="Sign In"
          onPress={handleSignIn}
          backgroundColor="#cbb7ff"
          textColor="#000"
        />

        {/* Mot de passe oublié */}
        <Text style={styles.forgotText}>Forgot password?</Text>
      </View>
      {/* Boutons sociaux visuels non fonctionnel pour l'instant */}
      <TouchableOpacity style={styles.socialButton}>
        <AntDesign name="google" size={20} color="#000" />
        <Text style={styles.socialText}>S'inscrire avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="apple" size={20} color="#000" />
        <Text style={styles.socialText}>S'inscrire avec Apple</Text>
      </TouchableOpacity>
      {/* Mentions légales à voir si on ajoute un lien vers une page */}
      <Text
        style={[styles.footerText, styles.link]}
        onPress={() => navigation.navigate("cgu")}
      >
        En continuant vous acceptez les conditions générales et la politique de
        confidentialité
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    paddingTop: 90,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "CocomatPro-Regular",
    marginBottom: 60,
    color: "#000",
  },
  form: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  input: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputField: {
    flex: 1,
    fontFamily: "Manrope-Extralight",
    color: "#000",
  },
  errorText: {
    color: "red",
    fontFamily: "Manrope-Extralight",
    fontSize: 13,
    marginBottom: 8,
    marginTop: -8,
    marginLeft: 5,
  },
  forgotText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "Manrope-Extralight",
    marginTop: 12,
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
  footerText: {
    marginTop: 70,
    fontSize: 12,
    textAlign: "center",
    color: "#999",
    fontFamily: "Manrope-Extralight",
    paddingHorizontal: 10,
  },

  link: {
    textDecorationLine: "underline",
    color: "#000",
    fontWeight: "500",
  },
});
