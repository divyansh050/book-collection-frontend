import React, { Component } from "react";
import Button from "./Components/Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-yellow-400">
          <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-red-500 mb-4">{this.state.error?.toString()}</p>
          <Button
            variant="ghost"
            onClick={this.resetError}
            className="from-red-500 to-red-600 text-white"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
