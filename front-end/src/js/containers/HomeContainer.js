import React, { useEffect, useState } from "react";
import { requestUserProfile } from "../apis/apiRequests";

const HomeContainer = () => {
  const [user, setUser] = useState(undefined);

  // useEffect(() => {
  //   const getUserInfo = () => {
  //     requestUserProfile()
  //       .then((res) => {
  //         setUser(res.data.user);
  //       })
  //       .catch((error) => console.log({ error: error.response.data }));
  //   };

  //   getUserInfo();
  // }, []);

  return (
    <div className="home__container">
      <h1>Create New Task</h1>
      <div className="create_task_container"></div>
    </div>
  );
};

export default HomeContainer;
