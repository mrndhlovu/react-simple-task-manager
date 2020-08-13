import React from "react";

import { useMainContent } from "../utils/hookUtils";
import CreateTask from "../components/shared/CreateTask";
import TasksList from "../components/tasks/TasksList";

const HomeContainer = () => {
  const { createTaskHandler, tasks } = useMainContent();

  const TODOS = tasks && tasks.filter((task) => task.status === "todo");
  const COMPLETED = tasks && tasks.filter((task) => task.status === "complete");
  const INCOMPLETES =
    tasks && tasks.filter((task) => task.status === "incomplete");

  const hasTodos = TODOS.length !== 0;
  const hasCompleted = COMPLETED.length !== 0;
  const hasInCompleted = INCOMPLETES.length !== 0;

  return (
    <>
      <CreateTask
        buttonText="Create New Task"
        header="Create New Task"
        handleButtonClick={createTaskHandler}
      />

      {hasTodos && <TasksList header="To Do" tasks={TODOS} />}

      {hasInCompleted && <TasksList header="In Complete" tasks={INCOMPLETES} />}

      {hasCompleted && <TasksList header="Complete" tasks={COMPLETED} />}
    </>
  );
};

export default HomeContainer;
