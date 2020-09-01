import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { locations } from "../constants/locations";

test("renders title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/weatherzone/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders dropdown with correct options", () => {
  const { getByTestId } = render(<App />);

  const ddOptions = getByTestId("locationSelector");
  expect(ddOptions).toBeInTheDocument();

  const locationOne = ddOptions.children[1].textContent;
  expect(locationOne).toBe(locations[0].location);
});

test("dropdown changes the value", () => {
  const { getByTestId } = render(<App />);

  const ddOptions = getByTestId("locationSelector");
  expect(ddOptions).toBeInTheDocument();

  // 624 is code for Sydney
  fireEvent.change(ddOptions, { target: { value: 624 } });

  expect(ddOptions[0].selected).toBeFalsy();
  expect(ddOptions[8].selected).toBeTruthy();
});
