import React, { useState, useEffect } from "react";
function App() {
  const [currentLoction, setCurrentLocation] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        setCurrentLocation(coordinates);
      },
      (err) => {
        console.warn(`Error (${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);
  return (
    <div className="App">
      <button onClick={() => console.log(currentLoction)}>
        Show coordinates
      </button>
    </div>
  );
}

export default App;
