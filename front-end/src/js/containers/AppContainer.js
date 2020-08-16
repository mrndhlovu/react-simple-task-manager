import React, { useEffect, useState } from "react";
import update from "immutability-helper";

import { useHistory, useLocation } from "react-router";

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
import { getValidUpdateFields } from "../utils/appUtils";
import { EDITABLE_TASK_FIELDS } from "../constants/constants";
import withAlert from "../hoc/withAlert";
import UIHeader from "../components/shared/UIHeader";

const INITIAL_STATE = {
  user: undefined,
  authenticated: false,
};

const AppContainer = ({ children, notify }) => {
  const history = useHistory();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [header, setHeader] = useState("Create New Task");
  const paramPath = location.pathname.split("/");

  const [isLoading, setIsLoading] = useState(true);

  const logoutHandler = async () => {
    await requestLogout()
      .then(() => authListener())
      .catch(() => {
        notify("Fail to logout!");
        authListener();
      });
  };

  const updateUserHandler = async (data) => {
    const ALLOWED_FIELDS = ["firstName", "lastName", "password", "email"];

    const body = getValidUpdateFields(data, ALLOWED_FIELDS);

    await requestUserUpdate(body)
      .then((res) => {
        authListener(res.data);
        notify("Profile updated");
      })
      .catch(() => {
        notify("Failed to updated profile");
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
        notify("List created");
      })
      .catch((err) => {
        notify("Failed to create List!");
      });
  };

  const deleteTaskHandler = async (taskId, callback) => {
    await requestDeleteTask(taskId)
      .then((res) => {
        callback && callback(res.data);
        notify("Task deleted!");
      })
      .catch((err) => {
        callback && callback(undefined, err.message);
        notify("Failed to delete Task!");
      });
  };

  const deleteListHandler = async (listId, callback) => {
    await requestDeleteList(listId)
      .then((res) => {
        callback && callback(res.data);
        notify("List deleted!");
      })
      .catch((err) => {
        callback && callback(undefined, err.message);
        notify("Failed to delete List!");
      });
  };

  const createTaskHandler = async (data, callback) => {
    await requestCreateTask(data)
      .then((res) => {
        notify("Task created!");
        const updatedTasks = update(tasks, {
          $push: [res.data],
        });
        setTasks(updatedTasks);
        callback && callback();
      })
      .catch((err) => {
        notify("Failed to create a task!");
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
        notify("Task updated!");
      })
      .catch((err) => {
        notify("Failed to update a task!");
      });
  };

  const deleteAccountHandler = async (data) => {
    await requestDeleteAccount()
      .then(() => {
        history.push("/login");
        authListener();
        notify("Account deleted!");
      })
      .catch(() => {
        authListener();
        notify("Failed to delete account!");
      });
  };

  const loginHandler = async (credentials) => {
    await requestLogin(credentials)
      .then((res) => {
        authListener(res.data.user);
        setTasks(res.data.tasks);
        setLists(res.data.lists);
        history.push("/");
        notify("Welcome Back!");
      })
      .catch((error) => {
        notify(error.response?.data.message);
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
        authListener(res.data.user);
        setTasks(res.data.tasks);
        setLists(res.data.lists);
        notify("Welcome!");
      })
      .catch((error) => {
        authListener();
        notify(error?.response?.data.message || "Failed to register!");
      });
  };

  const updateListHandler = (newList) => {
    setLists(newList);
  };

  useEffect(() => {
    switch (paramPath[1]) {
      case "settings":
        return setHeader("Account Details");
      case "register":
        return setHeader("Register");
      case "create-list":
        return setHeader("Create List");
      case "edit-task":
        return setHeader("Edit-task");
      default:
        return setHeader("Create New Task");
    }
  }, [paramPath]);

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
    isLoading,
    lists,
    loginHandler,
    logoutHandler,
    notify,
    registrationHandler,
    taskActionHandler,
    tasks,
    updatedTaskHandler,
    updateListHandler,
    updateUserHandler,
    setHeader,
    header,
  };

  return (
    <MainContext.Provider value={CONTEXT}>
      <div data-test-id="appContainer" className="app__container">
        <NavBar />
        <div className="content__container">
          <div className="header__container">
            <UIHeader content={header} className="ui__header" />
          </div>
          <div className="content__wrapper">{children}</div>
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default withAlert(AppContainer);
