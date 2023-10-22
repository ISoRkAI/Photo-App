import { ScrollView } from "react-native";
import { Image, Text } from "react-native";
import { View } from "react-native";

export const DefaultProfileScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#eaeaea" }}>
      <Image
        style={{ flex: 1, justifyContent: "flex-end" }}
        source={require("../../../../../assets/PhotoBG.png")}
      >
        <View
          style={{ width: "100%", height: 300, backgroundColor: "red" }}
        ></View>
      </Image>
      {/* <Text>DefaultProfileScreen</Text> */}
    </View>
  );
};
