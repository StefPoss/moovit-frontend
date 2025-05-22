import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../../components/buttons";
import questionForm from "../../data/onBoardingQuestion.json";
import ProgressBarComp from "../../components/ProgressBar";
import CheckBoxGroup from "../../components/QuestionOnBoard/CheckBoxGroup";
import FieldBox from "../../components/QuestionOnBoard/FieldBox";
import ImageSelect from "../../components/QuestionOnBoard/ImageSelect";
import CheckBoxObjectGroup from "../../components/QuestionOnBoard/CheckBoxObjectGroup";

export default function OnBoarding({ navigation }) {
  const [numQuestion, setNumQuestion] = useState(0);
  const [infos, setInfos] = useState({});

  const handleChange = (key, value) => {
    setInfos((e) => ({ ...e, [key]: value }));
  };

  if (numQuestion === questionForm.length) {
  }
  useEffect(() => {
    console.log(infos);
  }, [infos]);

  const onBoardingDisp = (numQuestion) => {
    if (questionForm[numQuestion]?.type) {
      if (questionForm[numQuestion].type === "checkBox") {
        return (
          <CheckBoxGroup
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
        );
        ////////////////////////////////:
      } else if (questionForm[numQuestion].type === "fieldBox") {
        return (
          <FieldBox
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
        );
        ////////////////////////////////:
      } else if (questionForm[numQuestion].type === "imgSelect") {
        return (
          <ImageSelect
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
        );
        ////////////////////////////////:
      } else if (questionForm[numQuestion].type === "checkBoxObject") {
        return (
          <CheckBoxObjectGroup
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={60}
      >
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
          <View>
            <ProgressBarComp count={numQuestion} />
          </View>
        </View>

        <View style={styles.formContent}>{onBoardingDisp(numQuestion)}</View>
        <View style={styles.fixedButton}>
          <Button
            title="Continuer"
            onPress={() => setNumQuestion(numQuestion + 1)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
  },

  countForm: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },

  countFormText: {
    fontFamily: "Manrope-ExtraLight",
    fontSize: 20,
    color: "#858585",
    textAlign: "center",
    flex: 1,
  },

  testbtn: {
    backgroundColor: "black",
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  testbtn1: {
    backgroundColor: "black",
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  formContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    height: "80%",
  },

  fixedButton: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});
