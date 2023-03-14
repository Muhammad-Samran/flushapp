import React from "react";
import Select, { Option, ReactSelectProps } from "react-select";

export const SelectField = ({ options, field, form, placeholder }) => {
  const customStyles = {
    placeholder: (provided, state) => ({
      ...provided,
      color: "gray",
    }),
    container: (provided, state) => ({
      ...provided,
      border: "2px solid #c7c6c6",
      borderRadius: "5px",
      fontSize: "0.9rem",
    }),
    control: (provided, state) => ({
      ...provided,
      height: "38px !important",
      minHeight: "33px !important",
      // none of react-select's styles are passed to <Control />
      border: "none",
      boxShadow: state.isSelected || state.isFocused ? "none" : "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#04d76a" : "#fff",
      cursor: "pointer",
    }),
  };
  return (
    <Select
      options={options}
      components={{ IndicatorSeparator: () => null }}
      name={field.name}
      value={
        options ? options.find((option) => option.value === field.value) : ""
      }
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      styles={customStyles}
      placeholder={placeholder || "Select..."}
    />
  );
};
