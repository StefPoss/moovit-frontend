import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import cgu from "../../data/cgu-fr.json";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CguScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{cgu.title}</Text>
        {cgu.content.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
});
