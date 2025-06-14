// CollegeLocationPicker.tsx
import { useState } from "react";
import {
  LoadScript,
  Autocomplete
} from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

const CollegeLocationPicker = () => {
  const [collegeName, setCollegeName] = useState("");
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.name) setCollegeName(place.name);
      if (place.geometry?.location) {
        setLatitude(place.geometry.location.lat().toFixed(6));
        setLongitude(place.geometry.location.lng().toFixed(6));
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBBVOhy3oMIrUFQpRLgv72Kp111dX_HxJs" libraries={libraries}>
      <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "Arial" }}>
        <h2>Search College</h2>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Enter college name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </Autocomplete>

        {latitude && longitude && (
          <div style={{ marginTop: "1rem" }}>
            <p><strong>College Name:</strong> {collegeName}</p>
            <p><strong>Latitude:</strong> {latitude}</p>
            <p><strong>Longitude:</strong> {longitude}</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default CollegeLocationPicker;
