import React from "react";

/**
 * LoadingState - the text while API call is made but no response received
 * ErrorState - if we get an error (non 200 OK) response from the API
 */
export const LoadingState = () => {
  return (
    <div className="blinkingText">
      Please wait while we load the latest data...
    </div>
  );
};

export const ErrorState = () => {
  return (
    <div className="errorText">
      We have trouble fetching latest data... About to display old/mocked data
    </div>
  );
};
