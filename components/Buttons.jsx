import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
//pour pouvoir pusher

export default function Button({
  title,
  onPress,
  backgroundColor = "#d6c9ff",
  textColor = "#000",
  width,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor, width }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
});
