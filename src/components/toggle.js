import React from "react";

function ToggleUnit({ unit, onToggle }) {
  return (
    <div>
      <button
        className={unit === "celsius" ? "active" : ""}
        onClick={() => onToggle()}
      >
        Celsius
      </button>
      <button
        className={unit === "fahrenheit" ? "active" : ""}
        onClick={() => onToggle()}
      >
        Fahrenheit
      </button>
    </div>
  );
}

export default ToggleUnit;
