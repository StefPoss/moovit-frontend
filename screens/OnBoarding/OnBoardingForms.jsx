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
import Button from "../../components/Buttons";
import questionForm from "../../data/onBoardingQuestion.json";
import ProgressBarComp from "../../components/ProgressBar";
import CheckBoxGroup from "../../components/QuestionOnBoard/CheckBoxGroup";
import FieldBox from "../../components/QuestionOnBoard/FieldBox";
import ImageSelect from "../../components/QuestionOnBoard/ImageSelect";
import CheckBoxObjectGroup from "../../components/QuestionOnBoard/CheckBoxObjectGroup";
import {
  addInfoToStore,
  removeAllInfoToStore,
} from "../../reducers/onBoardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkBody } from "../../modules/checkBody";
import { API_URL } from "@env";

export default function OnBoarding({ navigation }) {
  const [numQuestion, setNumQuestion] = useState(0);
  const [infos, setInfos] = useState({});
  const dispatch = useDispatch();

  const tokenFromRedux = useSelector((state) => state.user.value.token);

  const handleChange = (key, value) => {
    setInfos((e) => ({ ...e, [key]: value }));
  };

  useEffect(() => {
    setInfos((e) => ({ ...e, token: tokenFromRedux }));
  }, []);

  useEffect(() => {
    dispatch(addInfoToStore(infos));
  }, [infos]);

  useEffect(() => {
    if (numQuestion >= questionForm.length) {
      fetch(`${API_URL}/api/users/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infos),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Backend non atteint");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Réponse du backend :", data);
          navigation.navigate("TabNavigator");
          dispatch(removeAllInfoToStore());
        })
        .catch((error) => {
          console.error("Erreur lors de l’envoi :", error);
        });
    }
  }, [numQuestion]);

  const btnclick = () => {
    if (questionForm[numQuestion]?.required) {
      for (let i = 0; i < questionForm[numQuestion].data.length; i++) {
        const key = questionForm[numQuestion].data[i].name;
        if (!infos[key]) {
          alert("Merci de remplir tous les champs obligatoires");
          return;
        }
      }
    }

    setNumQuestion((n) => n + 1);
  };

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
            <Text style={styles.countFormText}>
              Question : {numQuestion + 1}/{questionForm.length}
            </Text>
          </View>
          <View>
            <ProgressBarComp count={numQuestion} total={questionForm.length} />
          </View>
        </View>

        <View style={styles.formContent}>{onBoardingDisp(numQuestion)}</View>
        <View style={styles.fixedButton}>
          <Button title="Continuer" onPress={btnclick} />
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
