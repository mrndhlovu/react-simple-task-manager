import React from "react";
import PropTypes from "prop-types";

import { Card, Button } from "@material-ui/core";

const CreateItemWrapper = ({
  children,
  buttonText,
  clickHandler,
  className = "create",
}) => {
  return (
    <div className="create__item__container">
      <Card className={`create__item__card ${className}`}>
        <div className="create__input__container">{children}</div>
        <Button
          size="medium"
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
  className: PropTypes.string,
};

export default CreateItemWrapper;
