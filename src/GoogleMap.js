import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent({ data }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAYeWqwpFgG29vB_yurdZeb0CC-zwLXn30",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {data.map((element) => {
        const position = {
          lat: parseFloat(element.latitude),
          lng: parseFloat(element.longitude),
        };
        return <Marker position={position} />;
      })}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
