import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { authSignUpUser } from "../../../redux/auth/authOperations";
import {
  Avatar,
  Container,
  ContainerForm,
  ImgBackground,
  Input,
  InputContainer,
  LogInBtn,
  LogInBtnText,
  PlusBtn,
  PlusImg,
  RegisterBtn,
  RegisterBtnText,
  ShowBtn,
  ShowText,
  Title,
} from "./RegistrationScreen.styled";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  email: "",
  password: "",
  login: "",
  imageAvatar: "",
};

export default RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const SigInUser = () => {
    if (state.login !== "" && state.email !== "" && state.password !== "") {
      dispatch(authSignUpUser(state));
      setState(initialState);
    } else {
      setKeyboardStatus(false);
      return console.log("Fill in all the fields!!!");
    }
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setState((prevState) => ({
        ...prevState,
        imageAvatar: result.assets[0].uri,
      }));
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <Container>
        <ImgBackground source={require("../../../../assets/PhotoBG.png")}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <ContainerForm keyboardStatus={keyboardStatus}>
              <View
                style={{ position: "absolute", top: -60, borderRadius: 16 }}
              >
                {image ? (
                  <Avatar
                    source={{ uri: image }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 16,
                      backgroundColor: "#f6f6f6",
                    }}
                  ></View>
                )}
                {image ? (
                  <PlusBtn
                    onPress={() => {
                      setImage();
                    }}
                  >
                    <PlusImg
                      source={require("../../../../assets/delete.png")}
                    />
                  </PlusBtn>
                ) : (
                  <PlusBtn
                    onPress={() => {
                      pickImage();
                    }}
                  >
                    <PlusImg source={require("../../../../assets/add.png")} />
                  </PlusBtn>
                )}
              </View>
              <Title>Регистрация</Title>
              <InputContainer>
                <Input
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  onFocus={() => setKeyboardStatus(true)}
                  onSubmitEditing={() => setKeyboardStatus(false)}
                  value={state.login}
                  placeholder="Логин"
                ></Input>
                <Input
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onFocus={() => setKeyboardStatus(true)}
                  onSubmitEditing={() => setKeyboardStatus(false)}
                  value={state.email}
                  placeholder="Адрес электронной почты"
                ></Input>
                <View style={{ marginBottom: 42 }}>
                  <Input
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onFocus={() => setKeyboardStatus(true)}
                    onSubmitEditing={() => setKeyboardStatus(false)}
                    value={state.password}
                    placeholder="Пароль"
                    secureTextEntry={secureText}
                    marginBottom0={true}
                  ></Input>
                  <ShowBtn onPress={() => setSecureText(!secureText)}>
                    <ShowText>{secureText ? `Показать` : "Скрыть"}</ShowText>
                  </ShowBtn>
                </View>
              </InputContainer>
              <RegisterBtn onPress={() => SigInUser()}>
                <RegisterBtnText>Войти</RegisterBtnText>
              </RegisterBtn>
              <LogInBtn onPress={() => navigation.navigate("LogIn")}>
                <LogInBtnText>Уже есть аккаунт? Войти</LogInBtnText>
              </LogInBtn>
            </ContainerForm>
          </KeyboardAvoidingView>
        </ImgBackground>
      </Container>
    </TouchableWithoutFeedback>
  );
};
// npm show firebase/app versions
// npm install expo-camera@new-version
// npm install react-native-screens@3.25.0
