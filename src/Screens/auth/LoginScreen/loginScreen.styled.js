import { Platform } from "react-native";
import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #eaeaea;
`;

export const ImgBackground = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
`;

export const ContainerForm = styled.View`
  background-color: #ffffff;
  padding: 32px 16px 144px 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  align-items: center;
  margin-bottom: ${(p) => (p.keyboardStatus ? -250 : 0)}px;
`;

export const Title = styled.Text`
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.01px;
  margin-bottom: 32px;
`;

export const InputContainer = styled.View`
  width: 100%;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-radius: 8px;
  background-color: #f6f6f6;
  border-color: #e8e8e8;
  margin-bottom: ${(p) => (p.marginBottom0 ? 0 : 16)}px;
  padding: 16px;
`;

export const ShowBtn = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === "ios" ? 16 : -42}px;
  right: 32px;
`;

export const ShowText = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: #1b4371;
`;

export const LogInBtn = styled.TouchableOpacity`
  width: 100%;
  border-radius: 100px;
  margin: 0 16px;
  padding: 16px;
  background-color: #ff6c00;
  margin-bottom: 16px;
  align-items: center;
`;

export const LogInBtnText = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;

export const RegistrationBtn = styled.TouchableOpacity`
  align-items: center;
  margin: 0 16px;
`;

export const RegistrationBtnText = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: #1b4371;
`;
