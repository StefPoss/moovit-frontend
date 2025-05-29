import { View, Text, TextInput, StyleSheet } from "react-native";
import CardComp from "../Card";
import { useState } from "react";

export default function FieldBox({ question, infos, handleChange }) {
  const [errors, setErrors] = useState({});

  const validate = (name, value, range) => {
    if (range && value !== "") {
      const val = parseInt(value, 10);
      if (isNaN(val) || val < range[0] || val > range[1]) {
        setErrors((e) => ({
          ...e,
          [name]: `Valeur entre ${range[0]} et ${range[1]}`,
        }));
      } else {
        setErrors((e) => ({ ...e, [name]: null }));
      }
    } else {
      setErrors((e) => ({ ...e, [name]: null }));
    }
  };

  return (
    <View style={styles.container}>
      {question.mainQuestion && (
        <CardComp
          color="#F5F5F5"
          text={question.mainQuestion}
          borderColor="#D5D5D5"
        />
      )}

      {question.secondaryQuestion && (
        <Text style={styles.secondary}>{question.secondaryQuestion}</Text>
      )}

      <View style={styles.fields}>
        {question.data.map((data) => (
          <View key={data.name} style={styles.inputGroup}>
            <Text style={styles.label}>{data.title}</Text>
            <TextInput
              value={infos[data.name] || ""}
              onChangeText={(text) => {
                handleChange(data.name, text);
                validate(data.name, text, data.range);
              }}
              placeholder={data.desc}
              style={styles.input}
              keyboardType={data.fieldType === "number" ? "numeric" : "default"}
            />
            {errors[data.name] && (
              <Text style={styles.errorText}>{errors[data.name]}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  secondary: {
    fontSize: 18,
    fontFamily: "ManropeBold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  fields: {
    gap: 20,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "ManropeBold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: "Questrial-Regular",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "ManropeRegular",
  },
});
