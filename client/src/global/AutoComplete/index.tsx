import { useState } from "react";
import {
  LoadScript,
  Autocomplete
} from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

const CollegeLocationPicker = () => {
  const [locationNam, setLocationName] = useState("");
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [autoInstance, setAutoInstance] = useState<google.maps.places.Autocomplete | null>(null);

  const handleAutoLoad = (instance: google.maps.places.Autocomplete) => {
    setAutoInstance(instance);
  };

  const handlePlaceSelection = () => {
    if (autoInstance) {
      const selectedPlace = autoInstance.getPlace();
      if (selectedPlace.name) setLocationName(selectedPlace.name);
      if (selectedPlace.geometry?.location) {
        setLat(selectedPlace.geometry.location.lat().toFixed(6));
        setLng(selectedPlace.geometry.location.lng().toFixed(6));
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBBVOhy3oMIrUFQpRLgv72Kp111dX_HxJs" libraries={libraries}>
      <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "Arial" }}>
        <h2>College Finder</h2>
        <Autocomplete onLoad={handleAutoLoad} onPlaceChanged={handlePlaceSelection}>
          <input
            type="text"
            placeholder="Type your college name"
            value={locationNam}
            onChange={(e) => setLocationName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </Autocomplete>

        {lat && lng && (
          <div style={{ marginTop: "1rem" }}>
            <p><strong>College:</strong> {locationNam}</p>
            <p><strong>Latitude:</strong> {lat}</p>
            <p><strong>Longitude:</strong> {lng}</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default CollegeLocationPicker;
