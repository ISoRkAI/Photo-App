import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 32px;
  padding: 32px 16px 0;
`;

export const PostContainer = styled.View`
  margin-bottom: 34px;
`;

export const AvatarContainer = styled.View`
  margin-bottom: 32px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  margin-right: 8px;
`;

export const UserName = styled.Text`
  color: #212121;
  // fontFamily: "Roboto",
  font-size: 13px;
  font-weight: 700;
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
