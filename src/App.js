import React, { useState, useEffect } from "react";
import keys from "./keys";
import CurrentData from "./components/CurrentData";
import "./styles/App.css";
function App() {
  const [currentLocation, setCurrentLocation] = useState({});
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

  useEffect(() => {
    async function fetchData(APIKey, APIName, position, stateFunction) {
      let lat = position.latitude;
      let lon = position.longitude;
      let APICall;
      switch (APIName) {
        case "OneCall":
          APICall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${APIKey}`;
          break;
        case "reverseGeoCoding":
          APICall = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${APIKey}`;
          break;

        default:
          APICall = "";
          break;
      }

      let res = await fetch(APICall);
      let data = await res.json();
      stateFunction(data);
    }
    if (typeof currentLocation.latitude !== "undefined") {
      fetchData(keys.OneCall, "OneCall", currentLocation, setforecast);
      fetchData(keys.Google, "reverseGeoCoding", currentLocation, setcityinfo);
    }
  }, [currentLocation]);
  const [cityinfo, setcityinfo] = useState({});
  const [forecast, setforecast] = useState({});
  // console.log(currentLocation);
  // console.log(cityinfo, forecast);
  return (
    <div className="App">
      {typeof forecast.current !== "undefined" ? (
        <CurrentData forecast={forecast} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
