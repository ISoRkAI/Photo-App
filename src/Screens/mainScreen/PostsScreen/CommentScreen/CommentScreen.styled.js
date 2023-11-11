import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  padding-top: 32px;
  background-color: #ffffff;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: 240px;
  border-radius: 8px;
  margin-bottom: 32px;
`;

export const CommentContainer = styled.View`
  flex-direction: ${(p) => (p.nickName === p.login ? "row-reverse" : "row")};
  margin-bottom: 24px;
`;

export const AvatarPhotoContainer = styled.View`
  width: 28px;
  height: 28px;
  background-color: #fd9898;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  margin-left: ${(p) => (p.nickName === p.login ? 16 : 0)}px;
  margin-right: ${(p) => (p.nickName === p.login ? 0 : 16)}px;
  margin-bottom: 24px;
`;

export const AvatarPhoto = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 16px;
`;

export const CommentBlock = styled.View`
  width: ${(p) => p.widthCommentBlock}px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 16px;
  border-bottom-left-radius: ${(p) => (p.nickName === p.login ? 6 : 0)}px;
  border-bottom-right-radius: ${(p) => (p.nickName === p.login ? 6 : 0)}px;
  border-top-left-radius: ${(p) => (p.nickName === p.login ? 6 : 0)}px;
  border-top-right-radius: ${(p) => (p.nickName === p.login ? 0 : 6)}px;
`;

export const CommentText = styled.Text`
  margin-bottom: 8px;
  color: #212121;
  font-size: 13px;
  line-height: 18px;
`;

export const TimeContainer = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const TimeText = styled.Text`
  color: #bdbdbd;
  font-size: 10px;
`;

export const TextInputContainer = styled.View`
  position: absolute;
  bottom: 0px;
  bottom: 0px;
  right: 16px;
  width: 100%;
  background-color: #ffffff;
  justify-content: flex-end;
  padding-bottom: 10px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 50px;
  background-color: #f6f6f6;
  border-width: 1px;
  border-color: #e8e8e8;
  padding-left: 16px;
`;

export const AddBtn = styled.TouchableOpacity`
  position: absolute;
  width: 34px;
  height: 34px;
  top: 9px;
  right: 9px;
  border-radius: 17px;
  background-color: #ff6c00;
  justify-content: center;
  align-items: center;
`;
