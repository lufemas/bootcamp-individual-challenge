import React from "react";
import "./Spinner.css"; // You'll need to create this CSS file for styling

interface SpinnerProps {
  size?: number; // Optional size prop (default is 50px)
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50 }) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div className="spinner" style={spinnerStyle}>
      <div className="spinner-inner" />
    </div>
  );
};

export default Spinner;
