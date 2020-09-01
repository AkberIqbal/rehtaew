import React, { useState } from "react";
import "./styles/App.css";
import { LoadingState, ErrorState } from "./components/otherStates";
import { locations } from "./constants/locations";
import Meteogram from "./components/meteogram";
import TableData from "./components/tableData";
import { getWeatherData } from "./core/api";
// import mockData from "./mocks/mock48.json";

/**
 * primary component for the App
 * calls the Table, Meteogram, loading components
 */
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [weatherUnitCelcius, setWeatherUnitCelcius] = useState(true);
  const [showTableData, setShowTableData] = useState(true);

  const getWeatherDataFromAPI = (locationCode) => {
    getWeatherData(locationCode)
      .then((res) => {
        setLoadingComplete(true);
        if (res && res.data) setWeatherData(res.data.countries[0].locations[0]);
      })
      .catch((err) => {
        setErrorState(true);
      });
  };

  const toggleWeatherUnit = () => {
    setWeatherUnitCelcius(!weatherUnitCelcius);
  };
  const toggleShowTableData = () => {
    setShowTableData(!showTableData);
  };

  const locationChange = (e) => {
    setLoadingComplete(false);
    getWeatherDataFromAPI(e.target.value);

    // delete me - for testing without API only
    // setWeatherData(mockData.countries[0].locations[0]);
    // setLoadingComplete(true);
  };

  return (
    <div className="App">
      <h1>Akber Iqbal</h1>
      <h2>48-hour Weather forcast powered by Weatherzone</h2>
      {locations && locations.length > 0 ? (
        <select
          data-testid="locationSelector"
          onChange={locationChange}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            Select a city to fetch latest data
          </option>
          {locations.map((loc, indx) => (
            <option key={`loc${indx}`} value={loc.code}>
              {loc.location}
            </option>
          ))}
        </select>
      ) : null}

      {!loadingComplete ? <LoadingState /> : null}

      {errorState ? <ErrorState /> : null}
      <div className="resultsArea">
        {weatherData && weatherData !== null ? (
          <>
            <Meteogram
              data={weatherData}
              toggleWeatherUnit={toggleWeatherUnit}
              weatherUnitCelcius={weatherUnitCelcius}
              toggleShowTableData={toggleShowTableData}
            />
            {showTableData ? (
              <TableData
                data={weatherData}
                weatherUnitCelcius={weatherUnitCelcius}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;
