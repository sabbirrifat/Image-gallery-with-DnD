import React from "react";
import "./filter-input.styles.css";

const FilterInput = ({ name, icon, value, handleChange }) => {
  return (
    <div className="filter">
      <div className="slider-left">
        <img src={icon} alt="" />
      </div>

      <input
        name={name}
        type="range"
        min="0"
        max="100"
        data-testid={name}
        value={value}
        onChange={handleChange}
      />

      <div className="slider-right">{`${value} ${
        name === "saturation" ? "dmp" : "%"
      }`}</div>
    </div>
  );
};

export default FilterInput;
