import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CardComp from "../Card";

export default function CheckBoxObjectGroup({ question, infos, handleChange }) {
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
        <View style={styles.second}>
          <Text style={styles.secondary}>{question.secondaryQuestion}</Text>
        </View>
      )}

      <View style={styles.optionList}>
        {question.data.map((data) => (
          <TouchableOpacity
            key={data.main}
            onPress={() => handleChange(data.name, data.main)}
            style={styles.option}
          >
            <View
              style={[
                styles.checkbox,
                infos[data.name] === data.main && styles.checkboxChecked,
              ]}
            >
              {infos[data.name] === data.main && (
                <Text style={styles.checkmark}>✔</Text>
              )}
            </View>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.label}>{data.main}</Text>
              <Text style={styles.desc}>{data.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  secondary: {
    fontSize: 18,
    fontFamily: "ManropeBold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  optionList: {
    gap: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#7d6bb3",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  checkboxChecked: {
    backgroundColor: "#7d6bb3",
    borderColor: "#7d6bb3",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontFamily: "CocomatPro-Regular",
  },
  desc: {
    fontSize: 14,
    fontFamily: "Manrope-ExtraLight",
    color: "#666",
  },
  second: {
    marginTop: "10%",
    marginBottom: "20%",
  },
});
