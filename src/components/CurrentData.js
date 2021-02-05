import React from "react";
import "../styles/currentData.css";
function CurrentData({ forecast }) {
  const unixToDate = (unixTimestamp, tzString = "America/Los_Angeles") => {
    const millisecs = unixTimestamp * 1000;
    const date = new Date(millisecs);

    return date.toLocaleTimeString("en-GB", { timeZone: tzString });
  };

  return (
    <section className="dataContainer">
      <section className="mainContent">
        <h3>
          Temp {"->"} {forecast.current.temp} K
        </h3>
      </section>

      <section className="additionalContent">
        <section className="dataList">
          <ul>
            <li>Precipitation</li>
            <li>Humidity</li>
            <li>Wind</li>
          </ul>
          <ul className="values">
            <li>{forecast.daily[0].pop}%</li>
            <li>{forecast.current.humidity}</li>
            <li>{parseFloat(forecast.current.wind_speed).toFixed(1)}m/s</li>
          </ul>
        </section>
      </section>
    </section>
  );
}

export default CurrentData;
