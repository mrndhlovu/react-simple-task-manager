import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";

import { MainContext } from "../utils/contextUtils";
import {
  requestUserProfile,
  requestLogout,
  requestLogin,
  requestRegistration,
  requestUserUpdate,
  requestDeleteAccount,
} from "../apis/authApiRequest";

import {
  requestDeleteTask,
  requestUpdateTask,
  requestCreateTask,
} from "../apis/tasksApiRequests";

import NavBar from "../components/navigation/NavBar";
import NavigationBar from "../components/navigation/NavigationBar";
import { getValidUpdateFields } from "../utils/appUtils";

const INITIAL_STATE = {
  user: undefined,
  authenticated: false,
};

const AppContainer = ({ children }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const handleLogout = async () => {
    await requestLogout()
      .then(() => authListener())
      .catch(() => authListener());
  };

  const updateUserHandler = async (data) => {
    const ALLOWED_FIELDS = ["firstName", "lastName", "password", "email"];

    const body = getValidUpdateFields(data, ALLOWED_FIELDS);

    await requestUserUpdate(body)
      .then((res) => {
        authListener(res.data);
      })
      .catch(() => {
        authListener();
      });
  };

  const deleteTaskHandler = async (taskId, callback) => {
    await requestDeleteTask(taskId)
      .then((res) => {
        callback && callback(res.data);
      })
      .catch((err) => {
        callback(undefined, err.message);
      });
  };

  const createTaskHandler = async (data, callback) => {
    await requestCreateTask(data)
      .then((res) => {
        callback && callback(res.data);
      })
      .catch((err) => {
        callback(undefined, err.message);
      });
  };

  const updatedTaskHandler = async (task, taskId, callback) => {
    await requestUpdateTask(task, taskId)
      .then((res) => {
        callback && callback(res.data);
      })
      .catch((err) => {
        callback(undefined, err.message);
      });
  };

  const deleteAccountHandler = async (data) => {
    await requestDeleteAccount()
      .then(() => {
        history.push("/login");
        authListener();
      })
      .catch(() => {
        authListener();
      });
  };

  const loginHandler = async (credentials) => {
    await requestLogin(credentials)
      .then((res) => {
        authListener(res.data);
        history.push("/");
      })
      .catch(() => {
        authListener();
      });
  };

  const authListener = (user) => {
    setUserInfo({
      user,
      authenticated: user?.firstName !== undefined,
    });

    setIsLoading(false);
  };

  const registrationHandler = async (credentials) => {
    await requestRegistration(credentials)
      .then((res) => {
        authListener(res.data);
      })
      .catch(() => {
        authListener();
      });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      await requestUserProfile()
        .then((res) => {
          authListener(res.data);
        })
        .catch(() => {
          authListener();
        });
    };

    getUserInfo();
  }, []);

  const CONTEXT = {
    auth: userInfo,
    authListener,
    deleteAccountHandler,
    handleLogout,
    isLoading,
    loginHandler,
    registrationHandler,
    updateUserHandler,
    deleteTaskHandler,
    updatedTaskHandler,
    createTaskHandler,
  };

  return (
    <MainContext.Provider value={CONTEXT}>
      <div data-test-id="appContainer" className="app__container">
        <NavBar />
        <NavigationBar className="lg__screen__menu" />
        <div className="content__container">{children}</div>
      </div>
    </MainContext.Provider>
  );
};

export default AppContainer;
