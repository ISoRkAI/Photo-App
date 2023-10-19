import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { authSignInUser } from "../../../redux/auth/authOperations";
import {
  Container,
  ContainerForm,
  Input,
  InputContainer,
  LogInBtn,
  LogInBtnText,
  RegistrationBtn,
  RegistrationBtnText,
  ShowBtn,
  ShowText,
  Title,
  ImgBackground,
} from "./loginScreen.styled";

const initialState = {
  email: "",
  password: "",
};

export default LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const loginUser = () => {
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <Container>
        <ImgBackground source={require("../../../../assets/PhotoBG.png")}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <ContainerForm keyboardStatus={keyboardStatus}>
              <Title>Войти</Title>
              <InputContainer>
                <Input
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onFocus={() => setKeyboardStatus(true)}
                  onSubmitEditing={() => setKeyboardStatus(false)}
                  placeholder="Адрес электронной почты"
                  value={state.email}
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
                    marginBottom0={true}
                    placeholder="Пароль"
                    value={state.password}
                    secureTextEntry={secureText}
                  ></Input>
                  <ShowBtn onPress={() => setSecureText(!secureText)}>
                    <ShowText>{secureText ? `Показать` : "Скрыть"}</ShowText>
                  </ShowBtn>
                </View>
              </InputContainer>
              <LogInBtn onPress={loginUser}>
                <LogInBtnText>Войти</LogInBtnText>
              </LogInBtn>
              <RegistrationBtn
                onPress={() => navigation.navigate("RegistrScreen")}
              >
                <RegistrationBtnText>
                  Нет аккаунта? Зарегистрироваться
                </RegistrationBtnText>
              </RegistrationBtn>
            </ContainerForm>
          </KeyboardAvoidingView>
        </ImgBackground>
      </Container>
    </TouchableWithoutFeedback>
  );
};
