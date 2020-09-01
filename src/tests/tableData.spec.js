import React from "react";
import { render } from "@testing-library/react";
import TableData, { setWeatherUnit } from "../components/tableData";
import mockData from "../mocks/mock48.json";

test("converts C to F correctly", () => {
  const celsiusTemp = 15;
  const farenhietTemp = setWeatherUnit(false, celsiusTemp);
  expect(farenhietTemp).toBe(59);
});

test("TableData component takes the data and prints the number of rows correctly with the correct unit", () => {
  const { getByText, getByTestId, getAllByTestId } = render(
    <TableData
      data={mockData.countries[0].locations[0]}
      weatherUnitCelcius={true}
    />
  );
  const tempUnitC = getByText(/°C/i);
  expect(tempUnitC).toBeInTheDocument();

  const tableBody = getByTestId("tableBody");
  expect(tableBody).toBeInTheDocument();

  const tableRow = getAllByTestId("tableRow");
  expect(tableRow).toHaveLength(
    mockData.countries[0].locations[0].part_day_forecasts.forecasts.length
  );
});

test("TableData rendered output is same as the input data", () => {
  const { getByText, getAllByTestId } = render(
    <TableData
      data={mockData.countries[0].locations[0]}
      weatherUnitCelcius={false}
    />
  );

  const tempUnitF = getByText(/°F/i);
  expect(tempUnitF).toBeInTheDocument();

  const tableRow = getAllByTestId("tableRow");
  const firstElementValueRelativeHumidity = tableRow[0].children[0].textContent;
  expect(firstElementValueRelativeHumidity).toBe(
    mockData.countries[0].locations[0].part_day_forecasts.forecasts[0].relative_humidity.toString()
  );
});
