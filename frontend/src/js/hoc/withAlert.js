/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from "react";

import Alert from "@material-ui/lab/Alert";

const withAlert = (WrappedComponent) => (props) => {
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  }, [message]);

  const notify = useCallback((newMessage) => setMessage(newMessage), []);

  return (
    <>
      {message && (
        <Alert className="ui__alert" severity="info">
          {message}
        </Alert>
      )}
      <WrappedComponent notify={notify} {...props} />
    </>
  );
};

export default withAlert;
