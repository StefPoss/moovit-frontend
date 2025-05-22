import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import CardComp from "../Card";

export default function ImageSelect({ question, infos, handleChange }) {
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

      <View style={styles.imageGroup}>
        {question.data.map((data) => (
          <TouchableOpacity
            key={data.title}
            onPress={() => handleChange(data.name, data.title)}
            style={[
              styles.imageBox,
              infos[data.name] === data.title && styles.selectedBox,
            ]}
          >
            <Image
              source={{ uri: data.src }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.label}>{data.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    width: "100%",
  },
  secondary: {
    fontSize: 18,
    fontFamily: "ManropeBold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "20%",
  },
  imageGroup: {
    gap: "15%",
    alignItems: "center",
  },
  imageBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: "3%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    width: "100%",
  },
  selectedBox: {
    backgroundColor: "#dcd6f7",
    borderColor: "#7d6bb3",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "CocomatPro-Regular",
  },
});
