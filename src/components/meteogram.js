import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { setDateInFormat, setWeatherUnit } from "./tableData";
import "../styles/meteogram.css";

const options = {
  responsive: true,
  tooltips: {
    mode: "label",
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    yAxes: [
      {
        id: "weatherOptions",
        type: "linear",
        position: "left",
      },
      /* maximum percentage point can be 1 (100%) */
      {
        id: "percentagePoints",
        type: "linear",
        position: "right",
        ticks: {
          max: 1,
          min: 0,
        },
      },
    ],
  },
};

/**
 * This is an example from the internet with mock Data, we use this as a starting line - could be helpful for debugging in future
 */
const dataTemplate = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      name: "PrecipitationProbability",
      label: "precipitation probability",
      type: "line",
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: "#003f5c",
      backgroundColor: "#003f5c",
      pointBorderColor: "#003f5c",
      pointBackgroundColor: "#003f5c",
      pointHoverBackgroundColor: "rgba(0, 63, 92, 0.5)",
      pointHoverBorderColor: "rgba(0, 63, 92, 0.5)",
    },
    {
      name: "Temperature",
      label: "Temperature",
      type: "bar",
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: "#ff6361",
      borderColor: "#ff6361",
      hoverBackgroundColor: "#ff6361",
      hoverBorderColor: "#ff6361",
    },
    {
      name: "Windspeed",
      label: "windspeed",
      type: "bar",
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: "#bc5090",
      borderColor: "#bc5090",
      hoverBackgroundColor: "#bc5090",
      hoverBorderColor: "#bc5090",
    },
  ],
};

/**
 * Primary component to display a graph;
 * toggle buttons could be branded and hence seemed a better choice in this component
 *
 * @param {object} data: relevant data with array of forecasts which need to be printed here
 * @param {boolean} weatherUnitCelcius: by default true means (centigrade)
 * @param {function} toggleWeatherUnit: toggle unit between celcius and farenheit
 * @param {function} toggleShowTableData: toggle display of tabular data
 */
const Meteogram = ({
  data,
  weatherUnitCelcius,
  toggleWeatherUnit,
  toggleShowTableData,
}) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let filledChartData = { ...dataTemplate };
    let labelArray = [];
    let precipitationProbabilityArray = [];
    let temperatureArray = [];
    let windspeedArray = [];

    if (
      data &&
      data.part_day_forecasts &&
      data.part_day_forecasts.forecasts &&
      data.part_day_forecasts.forecasts.length > 0
    ) {
      data.part_day_forecasts.forecasts.forEach((forecastRow) => {
        labelArray = [...labelArray, setDateInFormat(forecastRow.local_time)];
        precipitationProbabilityArray = [
          ...precipitationProbabilityArray,
          forecastRow.relative_humidity,
        ];
        temperatureArray = [
          ...temperatureArray,
          setWeatherUnit(weatherUnitCelcius, forecastRow.temperature),
        ];
        windspeedArray = [...windspeedArray, forecastRow.wind_speed];
      });

      filledChartData = { ...filledChartData, labels: labelArray };
      filledChartData.datasets.find(
        (x) => x.name === "PrecipitationProbability"
      ).data = precipitationProbabilityArray;

      filledChartData.datasets.find(
        (x) => x.name === "Temperature"
      ).data = temperatureArray;

      filledChartData.datasets.find(
        (x) => x.name === "Temperature"
      ).label = !weatherUnitCelcius ? "Temperature °F" : "Temperature °C";

      filledChartData.datasets.find(
        (x) => x.name === "Windspeed"
      ).data = windspeedArray;

      setChartData(filledChartData);
    }
  }, [data, weatherUnitCelcius]);

  return (
    <>
      {data === null ? null : (
        <div id="metrogram" className="metrogram">
          <button
            type="button"
            onClick={toggleWeatherUnit}
            data-testid="toggleWeatherUnit"
          >
            Change weather unit to{" "}
            {!weatherUnitCelcius ? <span>C</span> : <span>F</span>}
          </button>
          <button
            type="button"
            id="toggleShowTableData"
            onClick={toggleShowTableData}
            data-testid="toggleShowTableData"
          >
            Show/hide Tabular data
          </button>
          <h2>
            {" "}
            Meteogram data for {data.name}
            {", "}
            {data.state}
            {" ("}
            {data.postcode}
            {")"}
          </h2>
          <Bar data={chartData} width={100} height={70} options={options} />
        </div>
      )}
    </>
  );
};

Meteogram.propTypes = {
  data: PropTypes.object,
  weatherUnitCelcius: PropTypes.bool,
  toggleWeatherUnit: PropTypes.func,
  toggleShowTableData: PropTypes.func,
};

Meteogram.defaultProps = {
  data: {},
  weatherUnitCelcius: true,
  toggleWeatherUnit: () => {},
  toggleShowTableData: () => {},
};

export default Meteogram;
