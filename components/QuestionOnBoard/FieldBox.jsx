import { View, Text, TextInput, StyleSheet } from "react-native";
import CardComp from "../Card";

export default function FieldBox({ question, infos, handleChange }) {
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
              onChangeText={(text) => handleChange(data.name, text)}
              placeholder={data.desc}
              style={styles.input}
              keyboardType={data.fieldType === "number" ? "numeric" : "default"}
            />
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
});
