import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import { Container } from "./MapPostScreen.styled";

export default MapScreen = ({ navigation, route }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    navigation.addListener("transitionStart", () => {
      navigation.navigate("MainScreen", { screenOpen: false });
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        const { latitude, longitude } = route.params.location;

        const coords = {
          latitude: latitude,
          longitude: longitude,
        };
        setCoordinates(coords);
      } catch (error) {
        console.log("Error Location: ", error.message);
      }
    })();
  }, []);

  if (!coordinates) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#FF6C00" />
      </View>
    );
  }

  return (
    <Container>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          title={"photo travel"}
        />
      </MapView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
