import React from "react";
import "../styles/table.css";
import PropTypes from "prop-types";

/**
 * basic conversion from C to F and vice versa
 * @param {boolean} weatherUnitCelcius: by default true; false for farenhiet
 * @param {number} tempr: the actual temperature which we need to convert
 */
export const setWeatherUnit = (weatherUnitCelcius, tempr) => {
  return weatherUnitCelcius === false ? (tempr * 9) / 5 + 32 : tempr;
};

/**
 * makes it simple/readable to have a single function responsible for relevant date format
 * @param {string} passedTime
 */
export const setDateInFormat = (passedTime) => {
  const tranformedDate = new Date(passedTime);
  return (
    tranformedDate.toLocaleDateString().toString() +
    " " +
    tranformedDate.toLocaleTimeString().toString()
  );
};
/**
 * displays the data, some basic styling since no specific design to follow
 * @param {object} data: relevant data with array of forecasts which need to be printed here
 * @param {boolean} weatherUnitCelcius: by default true means (centigrade)
 */
const TableData = ({ data, weatherUnitCelcius }) => {
  return (
    <div className="tableComponent">
      {data && data.part_day_forecasts && data.part_day_forecasts.forecasts ? (
        <>
          <h2>
            {" "}
            Tabular data for {data.name} {", "}
            {data.state} {" ( "} {data.postcode} {" )"}
          </h2>
          <table>
            <thead>
              <tr>
                <th> precipitation probability</th>
                <th data-testid="tempUnit">
                  {" "}
                  temperature °{!weatherUnitCelcius ? "F" : "C"}
                </th>
                <th> wind speed</th>
                <th> wind direction</th>
                <th>
                  date and time <br />
                  All times are for{" "}
                  {data.part_day_forecasts.forecasts[0].time_zone}
                </th>
              </tr>
            </thead>
            <tbody data-testid="tableBody">
              {data.part_day_forecasts.forecasts.map(
                (individualforcast, index) => {
                  return (
                    <tr key={`row${index}`} data-testid="tableRow">
                      <td>{individualforcast.relative_humidity}</td>
                      <td>
                        {setWeatherUnit(
                          weatherUnitCelcius,
                          individualforcast.temperature
                        )}
                      </td>
                      <td>{individualforcast.wind_speed}</td>
                      <td>
                        {individualforcast.wind_direction}{" "}
                        {individualforcast.wind_direction_compass}
                      </td>
                      <td>{setDateInFormat(individualforcast.local_time)}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

TableData.propTypes = {
  data: PropTypes.object,
  weatherUnitCelcius: PropTypes.bool,
};

TableData.defaultProps = {
  data: {},
  weatherUnitCelcius: true,
};

export default TableData;
