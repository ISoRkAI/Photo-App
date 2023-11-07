import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const ProfileContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 22px;
`;

export const AvatarContainer = styled.View`
  width: 100%;
  position: absolute;
  top: -60px;
  border-radius: 16px;
  align-items: center;
`;

export const AvatarBlock = styled.View`
  background-color: #f6f6f6;
  border-radius: 16px;
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 16px;
`;

export const ExitBlock = styled.View`
  margin-bottom: 46px;
  margin-right: 16px;
  margin-left: auto;
`;

export const NameText = styled.Text`
  color: #212121;
  // fontFamily: "Roboto",
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

export const PostContainer = styled.View`
  margin-bottom: 34px;
`;

export const Post = styled.Image`
  height: 240px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const PostName = styled.Text`
  color: #212121;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const CommentBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CommentBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CommentLength = styled.Text`
  color: #bdbdbd;
  font-size: 16px;
`;

export const MapBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const TextLocation = styled.Text`
  color: #212121;
  font-size: 16px;
  text-decoration-line: underline;
`;
