import React, { useState } from "react";

import Alert from "@material-ui/lab/Alert";

import { useEffect } from "react";

const withAlert = (WrappedComponent) => (props) => {
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      message && setMessage(undefined);
    }, 3000);
  }, [message]);

  return (
    <>
      {message && (
        <Alert className="ui__alert" severity="info">
          {message}
        </Alert>
      )}
      <WrappedComponent
        notify={(newMessage) => setMessage(newMessage)}
        {...props}
      />
    </>
  );
};

export default withAlert;
