import React, { useEffect, useState } from "react";
import update from "immutability-helper";

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
  requestDeleteList,
  requestCreateList,
} from "../apis/tasksApiRequests";

import NavBar from "../components/navigation/NavBar";
import NavigationBar from "../components/navigation/NavigationBar";
import { getValidUpdateFields } from "../utils/appUtils";
import { EDITABLE_TASK_FIELDS } from "../constants/constants";

const INITIAL_STATE = {
  user: undefined,
  authenticated: false,
};

const AppContainer = ({ children }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  const createListHandler = async (title) => {
    await requestCreateList({ title })
      .then((res) => {
        const updatedLists = update(lists, {
          $push: [res.data],
        });
        setLists(updatedLists);
        history.push(`/lists/${res.data._id}`);
      })
      .catch((err) => {
        console.log("handleCreateList -> err", err.message);
      });
  };

  const deleteTaskHandler = async (taskId, callback) => {
    await requestDeleteTask(taskId)
      .then((res) => {
        callback && callback(res.data);
      })
      .catch((err) => {
        callback && callback(undefined, err.message);
      });
  };

  const deleteListHandler = async (listId, callback) => {
    await requestDeleteList(listId)
      .then((res) => {
        callback && callback(res.data);
      })
      .catch((err) => {
        callback && callback(undefined, err.message);
      });
  };

  const createTaskHandler = async (data, callback) => {
    await requestCreateTask(data)
      .then((res) => {
        const updatedTasks = update(tasks, {
          $push: [res.data],
        });
        setTasks(updatedTasks);
        callback && callback();
      })
      .catch((err) => {
        console.log("createTaskHandler -> err", err.data);
      });
  };

  const updatedTaskHandler = async (task, taskId, callback) => {
    const taskIndex = tasks.indexOf(task);

    await requestUpdateTask(task, taskId)
      .then((res) => {
        const updatedTasks = update(tasks, {
          $splice: [
            [taskIndex, 1],
            [taskIndex, 0, res.data],
          ],
        });

        setTasks(updatedTasks);
        callback && callback();
      })
      .catch((err) => {
        console.log("updatedTaskHandler -> err", err.message);
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

  const taskActionHandler = (action, task) => {
    const taskIndex = tasks.indexOf(task);
    const body = getValidUpdateFields(task, EDITABLE_TASK_FIELDS);

    switch (action) {
      case "delete":
        return deleteTaskHandler(task._id, (err) => {
          const updatedTasks = update(tasks, {
            $splice: [[taskIndex, 1]],
          });
          setTasks(updatedTasks);
        });
      case "edit":
        return history.push(`/edit-task/${task._id}`);
      case "incomplete":
        return updatedTaskHandler(
          {
            ...body,
            status: task.status === "incomplete" ? "todo" : "incomplete",
          },
          task._id
        );
      case "complete":
        return updatedTaskHandler(
          { ...body, status: task.status === "complete" ? "todo" : "complete" },
          task._id
        );
      default:
        break;
    }
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

  const updateListHandler = (newList) => {
    setLists(newList);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      await requestUserProfile()
        .then((res) => {
          authListener(res.data.user);
          setTasks(res.data.tasks);
          setLists(res.data.lists);
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
    createListHandler,
    createTaskHandler,
    deleteAccountHandler,
    deleteListHandler,
    deleteTaskHandler,
    handleLogout,
    isLoading,
    lists,
    loginHandler,
    registrationHandler,
    taskActionHandler,
    tasks,
    updatedTaskHandler,
    updateListHandler,
    updateUserHandler,
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
