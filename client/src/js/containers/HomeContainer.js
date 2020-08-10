import React, { useEffect, useState } from "react";
import { requestUserProfile } from "../apis/apiRequests";

const HomeContainer = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const getUserInfo = () => {
      requestUserProfile()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => console.log({ error: error.response.data }));
    };

    getUserInfo();
  }, []);

  return (
    <div className="home-container">
      {user ? `${user} user logged from db` : "React App, DB failed to load!"}{" "}
    </div>
  );
};

export default HomeContainer;
