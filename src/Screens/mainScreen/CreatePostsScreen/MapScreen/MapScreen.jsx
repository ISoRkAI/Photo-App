import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { Loader } from "../../../../components/Loader/Loader";

import { Container } from "./MapScreen.styled";

export default MapScreen = ({ navigation }) => {
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
    return <Loader />;
  }

  navigation.addListener("transitionStart", () => {
    navigation.navigate("Создать публикацию", { region, coordinates });
  });

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
