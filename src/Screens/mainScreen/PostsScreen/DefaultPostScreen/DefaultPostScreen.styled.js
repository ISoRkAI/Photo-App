import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 32px;
  padding: 32px 16px 0;
`;

export const DownloadBtn = styled.TouchableOpacity`
  margin-bottom: 32px;
`;

export const DownloadBtnText = styled.Text`
  color: #bdbdbd;
  font-size: 16px;
  line-height: 19px;
`;

export const Input = styled.TextInput`
  height: 50px;
  border-bottom-width: 1px;
  border-color: #e8e8e8;
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #212121;
`;

export const MapBtn = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  margin-bottom: 32px;
  align-items: center;
`;

export const MapBtnText = styled.Text`
  color: #212121;
  font-size: 16px;
  line-height: 19px;
`;

export const Placeholder = styled.Text`
  color: #bdbdbd;
`;

export const PublishBtn = styled.TouchableOpacity`
  height: 50px;
  background-color: ${(p) =>
    p.photoName.length !== 0 && p.photo ? "#ff6c00" : "#F6F6F6"};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

export const PublishBtnText = styled.Text`
  color: ${(p) =>
    p.photoName.length !== 0 && p.photo ? "#FFFFFF" : "#BDBDBD"};
  font-size: 16px;
  line-height: 19px;
`;

export const ClearBtn = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  background-color: #f6f6f6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45%;
`;
