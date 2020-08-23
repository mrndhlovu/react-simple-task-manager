import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

import { Card, Button } from "@material-ui/core";

const CreateItemWrapper = ({
  children,
  buttonText,
  clickHandler,
  className = "create",
}) => (
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

CreateItemWrapper.defaultProps = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

CreateItemWrapper.propTypes = {
  buttonText: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CreateItemWrapper;
