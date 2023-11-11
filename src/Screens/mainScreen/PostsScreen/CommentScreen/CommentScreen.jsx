import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import { selectorLogin } from "../../../../redux/selectors";
import {
  AddBtn,
  AvatarPhoto,
  AvatarPhotoContainer,
  CommentBlock,
  CommentContainer,
  CommentText,
  Container,
  Input,
  PostImage,
  TextInputContainer,
  TimeContainer,
  TimeText,
} from "./CommentScreen.styled";
import {
  createComment,
  getAllAvatarImg,
  getAllComment,
  recordsLengthComments,
} from "../../../../../firebase/firebaseOperations";

const optionsMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CommentScreen = ({ route, navigation }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [allAvatar, setAllAvatar] = useState([]);

  const login = useSelector(selectorLogin);

  const { postId, uri } = route.params;
  const screenHeight = Dimensions.get("window").width;
  const widthCommentBlock = screenHeight - 76;

  useEffect(() => {
    navigation.addListener("transitionStart", () => {
      navigation.navigate("MainScreen", { screenOpen: false });
    });
  }, [navigation]);

  useEffect(() => {
    getAllAvatarImg(setAllAvatar);
    getAllComment(postId, setAllComments);
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const addLeadingZero = (e) => {
    return e < 10 ? "0" + e : e;
  };

  const getCommentTime = () => {
    const time = new Date();
    const D = addLeadingZero(time.getDate());
    const M = optionsMonth[time.getMonth()];
    const Y = time.getFullYear();
    const h = time.getHours();
    const m = time.getMinutes();
    return `${D} ${M} ${Y} | ${h}:${m}`;
  };

  const sortedTransactions = [...allComments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const addComment = () => {
    if (!!comment) {
      createComment(
        allComments,
        postId,
        comment,
        login,
        recordsLengthComments,
        getCommentTime
      ),
        setComment("");
      return;
    }
    return;
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <Container>
        <PostImage source={{ uri }} />
        <FlatList
          data={sortedTransactions}
          keyExtractor={(_, indx) => indx.toString()}
          style={{
            marginBottom: 82,
          }}
          renderItem={({ item }) => {
            const { nickName, comment, time } = item;
            const avatar = allAvatar.find((item) => item.login === nickName);

            return (
              <CommentContainer nickName={nickName} login={login}>
                <AvatarPhotoContainer nickName={nickName} login={login}>
                  <AvatarPhoto source={{ uri: avatar.photo }} />
                </AvatarPhotoContainer>
                <CommentBlock
                  widthCommentBlock={widthCommentBlock}
                  nickName={nickName}
                  login={login}
                >
                  <CommentText>{comment}</CommentText>
                  <TimeContainer>
                    <TimeText>{time}</TimeText>
                  </TimeContainer>
                </CommentBlock>
              </CommentContainer>
            );
          }}
        />

        <TextInputContainer>
          <Input
            placeholder="Комментировать..."
            onChangeText={(value) => setComment(value)}
            value={comment}
          ></Input>
          <AddBtn
            onPress={() => {
              addComment();
            }}
          >
            <Feather name="arrow-up" size={24} color="#ffffff" />
          </AddBtn>
        </TextInputContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
