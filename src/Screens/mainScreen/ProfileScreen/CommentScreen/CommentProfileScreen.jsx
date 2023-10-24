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
  where,
} from "@firebase/firestore";
import { useState } from "react";
import { FlatList } from "react-native";

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

export const CommentProfileScreen = ({ route, navigation }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [allAvatar, setAllAvatar] = useState([]);

  const login = useSelector(selectorLogin);
  const id = useSelector(selectorUserId);

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
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        backgroundColor: "#ffffff",
      }}
    >
      <Image
        source={{ uri }}
        style={{
          width: "100%",
          height: 240,
          borderRadius: 8,
          marginBottom: 32,
        }}
      />
      <FlatList
        data={sortedTransactions}
        keyExtractor={(_, indx) => indx.toString()}
        style={{
          marginBottom: 82,
        }}
        renderItem={({ item }) => {
          const { nickName, comment, time } = item;

          const result = allAvatar.filter((avatars) => {
            return avatars.login.includes(nickName);
          });

          const avatar = result.map(({ photo }) => {
            return photo;
          });

          return (
            <View
              style={{
                flexDirection: nickName === login ? "row-reverse" : "row",
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#fd9898",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: nickName === login ? 0 : 16,
                  marginLeft: nickName === login ? 16 : 0,
                }}
              >
                <Image
                  source={{ uri: avatar[0] }}
                  style={{ width: 28, height: 28, borderRadius: 16 }}
                />
              </View>

              <View
                style={{
                  width: widthCommentBlock,
                  marginBottom: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: 16,
                  borderBottomLeftRadius: nickName === login ? 6 : 0,
                  borderBottomRightRadius: nickName === login ? 6 : 0,
                  borderTopLeftRadius: nickName === login ? 6 : 0,
                  borderTopRightRadius: nickName === login ? 0 : 6,
                }}
              >
                <Text
                  style={{
                    marginBottom: 8,
                    color: "#212121",
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                >
                  {comment}
                </Text>
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  <Text
                    style={{
                      color: "#BDBDBD",
                      fontSize: 10,
                    }}
                  >
                    {time}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 16,
          width: "100%",
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
    </View>
  );
};
