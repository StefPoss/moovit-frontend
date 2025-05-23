import React, { useState, useEffect } from "react";
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
import Button from "../../components/Buttons";
import { checkBody } from "../../modules/checkBody";
import { useDispatch } from "react-redux";
import { addUserToStore } from "../../reducers/userSlice";
import { API_URL } from "@env";

export default function SignupScreen({ navigation }) {
  // état pour afficher ou cacher le mot de passe
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(""); // état pour gérer la valeur du champ email avec initialisation
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  console.log(API_URL);

  useEffect(() => {
    console.log(password);
    console.log(email);
  }, [password, email]);

  // si l'email est invalid afficher le message d'erreur
  const handleSignup = () => {
    const requiredFields = ["email", "password"];
    const body = { email, password };

    if (!checkBody(body, requiredFields)) {
      setEmailError("Tous les champs sont requis");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email invalide");
    } else {
      setEmailError(""); // sinon on efface l'erreur

      fetch(`http://localhost:3000/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Backend non atteint");
          }
          return response.json();
        })
        .then((data) => {
          if (data.result) {
            console.log("Réponse du backend :", data);
            dispatch(addUserToStore({ token: data.token }));
            navigation.navigate("onBoarding");
          } else {
            alert(data.error);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l’envoi :", error);
        });

      console.log("Inscription réussie");
    } // navigation ou appel API ici vers le backend
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
            onChangeText={(value) => setEmail(value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password */}
        <View style={styles.input}>
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#aaa"
            onChangeText={(value) => setPassword(value)}
            value={password}
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
          title="S'inscrire"
          onPress={handleSignup}
          backgroundColor="#cbb7ff"
          textColor="#000"
        />

        {/* Mot de passe oublié */}
        <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
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
