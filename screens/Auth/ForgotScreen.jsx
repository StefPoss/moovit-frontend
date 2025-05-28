import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Buttons'; // Composant bouton réutilisable

export default function ForgotScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Se connecter')}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Page en progression</Text>
      <Text style={styles.subtitle}>En cours</Text>

      <TextInput
        style={styles.input}
        placeholder=""
        value={email}
        onChangeText={setEmail}
      />

      <Button
        title="Continuer"
        onPress={() => console.log("Lien envoyé à", email)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 80,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
});

