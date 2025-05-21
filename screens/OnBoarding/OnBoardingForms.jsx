import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import Button from "../../components/buttons";
import questionForm from "../../data/onBoardingQuestion.json";
import ProgressBarComp from "../../components/ProgressBar";
import CardComp from "../../components/Card";
import { Checkbox } from "react-native-paper";

export default function SignupScreen({ navigation }) {
  const [numQuestion, setNumQuestion] = useState(0);
  const [gend, setGender] = useState(null);
  const [level, setLevel] = useState(null);
  const [sport, setSport] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [infos, setInfos] = useState({});

  useEffect(() => {
    console.log(numQuestion);
    console.log(gend);
    console.log(level);
    console.log(sport);
    console.log(infos);
  }, [numQuestion, gend, level, sport, infos]);
  const handleChange = (key, value) => {
    setInfos((prev) => ({ ...prev, [key]: value }));
  };

  const onBoardingDisp = (numQuestion) => {
    if (questionForm[numQuestion]?.type) {
      if (questionForm[numQuestion].type === "checkBox") {
        return (
          <View style={styles.onBoardContain}>
            {questionForm[numQuestion]?.mainQuestion ? (
              <CardComp
                color={"#F5F5F5"}
                text={questionForm[numQuestion].mainQuestion}
                // borderColor={"#D5D5D5"}
              />
            ) : null}
            {questionForm[numQuestion]?.secondaryQuestion ? (
              <Text style={styles.textSecondQuestion}>
                {questionForm[numQuestion].secondaryQuestion}
              </Text>
            ) : null}
            <View style={styles.boxContain}>
              {questionForm[numQuestion].data.map((data) => (
                <View key={data} style={styles.checkedBox}>
                  <Checkbox
                    status={gend === data ? "checked" : "unchecked"}
                    onPress={() => setGender(data)}
                  />
                  <Text
                    style={styles.textChecked}
                    onPress={() => setGender(data)}
                  >
                    {data}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.buttonOnboard}>
              <Button title={"Continuer"} style={styles.buttonOnboard} />
            </View>
          </View>
        );
        ////////////////////////////////:
      } else if (questionForm[numQuestion].type === "fieldBox") {
        return (
          <View style={styles.onBoardContain}>
            {questionForm[numQuestion]?.mainQuestion ? (
              <CardComp
                color={"#F5F5F5"}
                text={questionForm[numQuestion].mainQuestion}
              />
            ) : null}
            {questionForm[numQuestion]?.secondaryQuestion ? (
              <Text style={styles.textSecondQuestion}>
                {questionForm[numQuestion].secondaryQuestion}
              </Text>
            ) : null}
            <View style={styles.boxContain}>
              {questionForm[numQuestion].data.map((data) => (
                <View key={data.title}>
                  <Text>{data.title}</Text>
                  <TextInput
                    onChangeText={(text) => handleChange(data.title, text)}
                    value={infos[data.title] || ""}
                    style={styles.textinput}
                    placeholder={data.desc}
                  />
                </View>
              ))}
            </View>
            <View style={styles.buttonOnboard}>
              <Button title={"Continuer"} style={styles.buttonOnboard} />
            </View>
          </View>
        );
        ////////////////////////////////:
      } else if (questionForm[numQuestion].type === "imgSelect") {
        return (
          <View style={styles.onBoardContain}>
            {questionForm[numQuestion]?.mainQuestion ? (
              <CardComp
                color={"#F5F5F5"}
                text={questionForm[numQuestion].mainQuestion}
                // borderColor={"#D5D5D5"}
              />
            ) : null}

            {questionForm[numQuestion]?.secondaryQuestion ? (
              <Text style={styles.textSecondQuestion}>
                {questionForm[numQuestion].secondaryQuestion}
              </Text>
            ) : null}
            <View style={styles.boxContain}>
              {questionForm[numQuestion].data.map((data) => (
                <TouchableOpacity
                  key={data.title}
                  onPress={() => setSport(data.title)}
                  style={[
                    styles.sportBox,
                    sport === data.title && styles.selectedBox,
                  ]}
                >
                  <Image
                    source={{ uri: data.src }}
                    style={styles.sportImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.sportLabel}>{data.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonOnboard}>
              <Button title={"Continuer"} style={styles.buttonOnboard} />
            </View>
          </View>
        );
        ////////////////////////////////:
      } else if (questionForm[numQuestion].type === "checkBoxObject") {
        return (
          <View style={styles.onBoardContain}>
            {questionForm[numQuestion]?.mainQuestion ? (
              <CardComp
                color={"#F5F5F5"}
                text={questionForm[numQuestion].mainQuestion}
                borderColor={"#D5D5D5"}
              />
            ) : null}
            {questionForm[numQuestion]?.secondaryQuestion ? (
              <Text style={styles.textSecondQuestion}>
                {questionForm[numQuestion].secondaryQuestion}
              </Text>
            ) : null}
            <View style={styles.boxContain}>
              {questionForm[numQuestion].data.map((data) => (
                <View key={data.main} style={styles.checkedBox}>
                  <Checkbox
                    status={level === data.main ? "checked" : "unchecked"}
                    onPress={() => setLevel(data.main)}
                    style={styles.checkDesign}
                  />
                  <Text
                    style={styles.textChecked}
                    onPress={() => setLevel(data.main)}
                  >
                    <Text>
                      {data.main}
                      {"\n"}
                    </Text>
                    <Text style={styles.descdata}>{data.desc}</Text>
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.buttonOnboard}>
              <Button title={"Continuer"} style={styles.buttonOnboard} />
            </View>
          </View>
        );
        ////////////////////////////////:
      } else {
        null;
      }
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.countForm}>
          <TouchableOpacity
            style={styles.testbtn1}
            onPress={() => setNumQuestion(numQuestion - 1)}
          ></TouchableOpacity>
          <Text style={styles.countFormText}>
            Question : {numQuestion + 1}/{questionForm.length}
          </Text>
          <TouchableOpacity
            style={styles.testbtn}
            onPress={() => setNumQuestion(numQuestion + 1)}
          ></TouchableOpacity>
        </View>
        <ProgressBarComp count={numQuestion} />
      </View>
      {/* Demmarage du Onboarding  */}
      <View style={styles.form}>{onBoardingDisp(numQuestion)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  countForm: {
    width: "100%",
    marginHorizontal: "auto",
    marginBottom: 15,
    flexDirection: "row",
  },
  countFormText: {
    fontFamily: "Manrope-ExtraLight",
    fontSize: 30,
    color: "#858585",
  },
  testbtn: {
    borderWidth: 3,
    right: -20,
    width: 50,
    backgroundColor: "black",
  },
  testbtn1: {
    borderWidth: 3,
    right: 20,
    width: 50,
    backgroundColor: "black",
  },
  onBoardContain: {
    marginTop: 10,
    justifyContent: "space-between",

    flex: 0.98,
    width: "440",
  },
  textSecondQuestion: {
    marginTop: 0,
    marginHorizontal: "auto",
    fontSize: 20,
    fontFamily: "ManropeBold",
  },
  checkedBox: {
    flexDirection: "row",
    fontSize: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  boxContain: {
    alignItems: "center",
    height: "40%",
    paddingHorizontal: 20,
  },
  textChecked: {
    fontSize: 20,
    fontFamily: "CocomatPro-Regular",
    marginBottom: 10,
  },
  buttonOnboard: {
    width: "80%",
    marginHorizontal: "auto",
    paddingBottom: 15,
    positon: "absolute",
  },
  checkDesign: {
    borderWidth: 1,
  },
  descdata: {
    fontFamily: "Manrope-ExtraLight",
  },
  sportBox: {
    alignItems: "center",
    padding: 10,

    borderColor: "#ccc",
    borderRadius: 12,
    width: 200,
    flexDirection: "row",
  },
  selectedBox: {
    backgroundColor: "#7d6bb3",
  },
  sportImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  sportLabel: {
    fontSize: 16,
    textAlign: "center",
  },
  textinput: {
    borderWidth: 2,
    width: 350,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
});
