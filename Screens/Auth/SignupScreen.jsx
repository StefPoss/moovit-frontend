import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Button from "../../components/buttons";

export default function SignupScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Créer votre compte</Text>

      {/* Formulaire */}
      <View style={styles.form}>
        {/* Email */}
        <View style={styles.input}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.inputField} // pour les boutons
          />
        </View>

        {/* Password avec œil */}
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
            style={styles.inputField} // pour les boutons 
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="#777"
            />
          </Pressable>
        </View>

        {/* Bouton "Sign In" */}
        <Button
          title="Sign In"
          onPress={() => console.log('Sign In pressed')}
          backgroundColor="#cbb7ff"
          textColor="#000"
        />

        {/* Mot de passe oublié */}
        <Text style={styles.forgotText}>Forgot password?</Text>
      </View>

      {/* Bouton Google (visuel uniquement sans fonctionnalité) */}
      <TouchableOpacity style={styles.socialButton}>
        <AntDesign name="google" size={20} color="#000" />
        <Text style={styles.socialText}>S'inscrire avec Google</Text>
      </TouchableOpacity>

      {/* Bouton Apple (visuel uniquement sans fonctionnalité) */}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="apple" size={20} color="#000" />
        <Text style={styles.socialText}>S'inscrire avec Apple</Text>
      </TouchableOpacity>

      {/* Mentions légales */}
      <Text style={styles.footerText}>
        En continuant vous acceptez les conditions générales et la politique de confidentialité
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 80,
    alignItems: 'center',

  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'CocomatPro-Regular',
    marginBottom: 30,
    color: '#000',
  },
  form: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputField: {
    flex: 1,
    fontFamily: 'Manrope-Extralight',
    color: '#000',
  },
  forgotText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Manrope-Extralight',
    marginTop: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
  },
  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'CocomatPro-Regular',
  },
  footerText: {
    marginTop: 70,
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Manrope-Extralight',
    paddingHorizontal: 10,
  },
});