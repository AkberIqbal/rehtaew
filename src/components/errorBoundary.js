import React, { Component } from "react";
import "../styles/App.css";

/**
 * very simple UI in case of an error
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState((state) => ({ ...state, hasError: true }));
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fallbackUI">
          <h1>this is a fallback UI</h1>
          <p>ErrorBoundary: something went wrong</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
