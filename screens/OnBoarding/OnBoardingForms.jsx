import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
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
import { API_URL } from "@env";

const { width, height } = Dimensions.get('window');


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
        const fieldType = questionForm[numQuestion].data[i].fieldType;
        const range = questionForm[numQuestion].data[i].range;

        const val = infos[key];

        if (!val) {
          alert("Merci de remplir tous les champs obligatoires");
          return;
        }

        if (fieldType === "number" && range) {
          const numberVal = parseInt(val, 10);
          if (
            isNaN(numberVal) ||
            numberVal < range[0] ||
            numberVal > range[1]
          ) {
            alert(
              `${questionForm[numQuestion].data[i].title} doit être un nombre entre ${range[0]} et ${range[1]}`
            );
            return;
          }
        }
      }
    }


     setNumQuestion((n) => n + 1)

    // if(numQuestion<questionForm.length){setNumQuestion((n) => n + 1)}
    
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
      } else if (questionForm[numQuestion].type === "fieldBox") {
        return (
          <FieldBox
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
        );
      } else if (questionForm[numQuestion].type === "imgSelect") {
        return (
          <ImageSelect
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
        );
      } else if (questionForm[numQuestion].type === "checkBoxObject") {
        return (
          <CheckBoxObjectGroup
            question={questionForm[numQuestion]}
            infos={infos}
            handleChange={handleChange}
          />
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    numQuestion<questionForm.length && <View style={styles.pageContainer}>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexGrow}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.flexGrow}>
            {/* Scroll sur le contenu uniquement */}
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.countForm}>
                <Text style={styles.countFormText}>
                  Question : {numQuestion + 1}/{questionForm.length}
                </Text>
              </View>

              <ProgressBarComp
                count={numQuestion}
                total={questionForm.length}
              />

              <View style={styles.formContent}>
                {onBoardingDisp(numQuestion)}
              </View>
            </ScrollView>
           
           
          </View>

        </TouchableWithoutFeedback>
       
      </KeyboardAvoidingView>
      
       
    </SafeAreaView>
     {/* Bouton en dehors du scroll, visible au-dessus du clavier */}
            <View style={styles.fixedButton}>
              <Button title="Continuer" onPress={btnclick} />
            </View>
            <View style={styles.whiteBackground}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer:{
    flex:1,

  },
  container: {
    height:height*0.85,
    backgroundColor: "white",
    paddingTop: 60,
  },

  flexGrow: {
    flex: 1,
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
    fontFamily: "Questrial",
    fontSize: 20,
    color: "#858585",
    textAlign: "center",
    flex: 1,
    width: "100%",
  },

  formContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
    width:width*0.95,
    marginLeft:width*0.025
    
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Laisse de la place au bouton
  },

  fixedButton: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    backgroundColor: "white",
   
    
  },
  whiteBackground:{
     backgroundColor: "white",
     height:height*1,
  }
});
