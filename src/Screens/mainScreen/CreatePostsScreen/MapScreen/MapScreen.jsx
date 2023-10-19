import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

export default MapScreen = ({ navigation, route }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;

        const coords = {
          latitude: latitude,
          longitude: longitude,
        };
        setCoordinates(coords);

        const regionName = await Location.reverseGeocodeAsync({
          longitude: longitude,
          latitude: latitude,
        });
        setRegion(regionName);
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

  navigation.addListener("transitionStart", () => {
    navigation.navigate("Создать публикацию", { region, coordinates });
  });

  return (
    <View style={styles.container}>
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
    </View>
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
