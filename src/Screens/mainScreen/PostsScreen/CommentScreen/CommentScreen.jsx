import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { selectorLogin, selectorUserId } from "../../../../redux/selectors";
import { db } from "../../../../../firebase/config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "@firebase/firestore";
import { useState } from "react";
import { FlatList } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import {
  AvatarPhoto,
  AvatarPhotoContainer,
  CommentBlock,
  CommentContainer,
  CommentText,
  Container,
  PostImage,
  TimeContainer,
  TimeText,
} from "./CommentScreen.styled";

const optionsMonth = [
  "Січня",
  "Лютого",
  "Березня",
  "Квітня",
  "Травня",
  "Червня",
  "Липня",
  "Серпня",
  "Вересня",
  "Жовтня",
  "Листопада",
  "Грудня",
];

export const CommentScreen = ({ route, navigation }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [allAvatar, setAllAvatar] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

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
    getAllAvatarImg();
    getAllComment();
  }, []);

  const keyboardHide = () => {
    setKeyboardStatus(false);
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

  const createComment = async () => {
    await addDoc(collection(db, "posts", postId, "comment"), {
      comment,
      nickName: login,
      time: getCommentTime().toString(),
      date: +new Date(),
    });
    recordsLengthComments();
  };

  const getAllComment = async () => {
    const queryComments = query(collection(db, "posts", postId, "comment"));
    onSnapshot(queryComments, (data) => {
      setAllComments(data.docs.map((doc) => doc.data()));
    });
  };

  const getAllAvatarImg = async () => {
    const queryAvatar = query(collection(db, "avatars"));
    onSnapshot(queryAvatar, (data) => {
      setAllAvatar(data.docs.map((doc) => doc.data()));
    });
  };

  const recordsLengthComments = async () => {
    const frankDocRef = doc(db, "posts", postId);
    await updateDoc(frankDocRef, {
      length: Number(allComments.length) + 1,
    });
  };

  const sortedTransactions = [...allComments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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
        <View
          keyboardStatus={keyboardStatus}
          style={{
            position: "absolute",
            bottom: 32,
            right: 16,
            width: "100%",
            backgroundColor: "#ffffff",
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            placeholder="Комментировать..."
            onChangeText={(value) => setComment(value)}
            value={comment}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 50,
              backgroundColor: "#F6F6F6",
              borderWidth: 1,
              borderColor: "#E8E8E8",
              paddingLeft: 16,
            }}
          ></TextInput>
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 34,
              height: 34,
              top: 9,
              right: 9,
              borderRadius: "50%",
              backgroundColor: "#FF6C00",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              createComment(), setComment("");
            }}
          >
            <Feather name="arrow-up" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};
