import { Camera } from "expo-camera";
import styled from "styled-components";

export const PhotoBlock = styled.View`
  margin-bottom: 8px;
  border-radius: 8px;
`;

export const Photo = styled.Image`
  height: 240px;
  border-radius: 8px;
`;

export const DeletePhoto = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

export const CameraBlock = styled.View`
  border-radius: 8px;
  height: 240px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const PhotoCamera = styled(Camera)`
  height: 240px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const PhotoBtn = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
`;
