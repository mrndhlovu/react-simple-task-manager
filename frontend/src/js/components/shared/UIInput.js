import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

const UIInput = ({
  id = "ui-input",
  label,
  type,
  handleChange,
  className = "input",
  defaultValue,
  placeholder,
}) => {
  return (
    <div className="ui__input__container">
      {label && (
        <div className="ui__input__label__container">
          <label className="input__label">{label}</label>
        </div>
      )}
      <TextField
        className={`${className} ui__input`}
        id={id}
        type={type}
        variant="outlined"
        onChange={handleChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        fullWidth
      />
    </div>
  );
};

UIInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default UIInput;
