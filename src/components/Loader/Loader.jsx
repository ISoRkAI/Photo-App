import { ActivityIndicator } from "react-native";
import { View } from "react-native";

export const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" color="#FF6C00" />
    </View>
  );
};
