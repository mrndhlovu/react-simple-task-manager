import React from "react";
import PropTypes from "prop-types";

import { Card, Button } from "@material-ui/core";

import UIHeader from "./UIHeader";

const CreateItemWrapper = ({
  children,
  buttonText,
  clickHandler,
  header,
  className = "create",
}) => {
  return (
    <div className="create__item__container">
      <UIHeader content={header} />
      <Card className={`create__item__card ${className}`}>
        <div className="create__input__container">{children}</div>
        <Button
          size="large"
          className="submit__button"
          variant="contained"
          onClick={clickHandler}
        >
          {buttonText}
        </Button>
      </Card>
    </div>
  );
};

CreateItemWrapper.propTypes = {
  buttonText: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CreateItemWrapper;
