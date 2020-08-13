import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import update from "immutability-helper";

import { EDITABLE_TASK_FIELDS } from "../constants/constants";
import { getValidUpdateFields } from "../utils/appUtils";
import { requestAllTasks } from "../apis/tasksApiRequests";
import { TaskContext } from "../utils/contextUtils";
import { useMainContent } from "../utils/hookUtils";
import CreateTask from "../components/shared/CreateTask";
import TasksList from "../components/tasks/TasksList";

const HomeContainer = () => {
  const history = useHistory();
  const {
    deleteTaskHandler,
    updatedTaskHandler,
    createTaskHandler,
  } = useMainContent();

  const [tasks, setTasks] = useState([]);

  const TODOS = tasks && tasks.filter((task) => task.status === "todo");
  const COMPLETED = tasks && tasks.filter((task) => task.status === "complete");
  const INCOMPLETES =
    tasks && tasks.filter((task) => task.status === "incomplete");

  const hasTodos = TODOS.length !== 0;
  const hasCompleted = COMPLETED.length !== 0;
  const hasInCompleted = INCOMPLETES.length !== 0;

  const updatedTask = async (body, task) => {
    const taskIndex = tasks.indexOf(task);

    updatedTaskHandler(body, task._id, (data, error) => {
      if (error) return console.log(error);

      const updatedTasks = update(tasks, {
        $splice: [
          [taskIndex, 1],
          [taskIndex, 0, data],
        ],
      });

      setTasks(updatedTasks);
    });
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
        return updatedTask(
          {
            ...body,
            status: task.status === "incomplete" ? "todo" : "incomplete",
          },
          task
        );
      case "complete":
        return updatedTask(
          { ...body, status: task.status === "complete" ? "todo" : "complete" },
          task
        );
      default:
        break;
    }
  };

  const createTask = (data, callback) => {
    createTaskHandler(data, (data, error) => {
      if (error) return console.log(error);

      const updatedTasks = update(tasks, {
        $push: [data],
      });
      setTasks(updatedTasks);
      callback && callback();
    });
  };

  useEffect(() => {
    const getTasks = async () => {
      await requestAllTasks()
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => {
          console.log("getTasks -> err", err.message);
        });
    };
    getTasks();
  }, []);

  const CONTEXT = {
    taskActionHandler,
  };

  return (
    <TaskContext.Provider value={CONTEXT}>
      <CreateTask
        buttonText="Create New Task"
        header="Create New Task"
        handleButtonClick={createTask}
      />
      {hasTodos && <TasksList header="To Do" tasks={TODOS} />}

      {hasInCompleted && <TasksList header="In Complete" tasks={INCOMPLETES} />}

      {hasCompleted && <TasksList header="Complete" tasks={COMPLETED} />}
    </TaskContext.Provider>
  );
};

export default HomeContainer;
