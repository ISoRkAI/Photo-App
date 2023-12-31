import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { nanoid } from "@reduxjs/toolkit";

import { authSignUpUser } from "../../../redux/auth/authOperations";

import {
  Container,
  ContainerForm,
  ImgBackground,
  Input,
  InputContainer,
  LogInBtn,
  LogInBtnText,
  RegisterBtn,
  RegisterBtnText,
  ShowBtn,
  ShowText,
  Title,
} from "./RegistrationScreen.styled";
import { AvatarPhoto } from "./AvatarPhoto/AvatarPhoto";
import { downloadUrl } from "../../../../firebase/firebaseOperations";

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
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const [idRef, setIdRef] = useState(nanoid());

  const dispatch = useDispatch();

  useEffect(() => {
    setIdRef(nanoid());
  }, []);

  useEffect(() => {
    if (uploadAvatar) {
      downloadUrl(idRef, setState);
      return;
    }
  }, [uploadAvatar]);

  const SigInUser = async () => {
    if (
      state.login &&
      state.email &&
      state.password &&
      state.imageAvatar !== ""
    ) {
      dispatch(authSignUpUser(state));
      setState(initialState);
    } else {
      setKeyboardStatus(false);
      Toast.show({ type: "error", text1: "Fill in all the fields!!!" });
    }
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <Container>
        <ImgBackground source={require("../../../../assets/PhotoBG.png")}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <ContainerForm keyboardStatus={keyboardStatus}>
              <AvatarPhoto
                image={image}
                setImage={setImage}
                setUploadAvatar={setUploadAvatar}
                idRef={idRef}
              />
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
