import React from "react";

import CreateTask from "../components/tasks/CreateTask";
import TasksList from "../components/tasks/TasksList";

const HomeContainer = () => {
  const editTaskHandler = (action, task) => {
    console.log("editTaskHandler -> action, task", action, task);
  };

  return (
    <>
      <CreateTask />
      <TasksList
        editTaskHandler={editTaskHandler}
        header="To Do"
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
          },
        ]}
      />{" "}
      <TasksList
        header="In Complete"
        editTaskHandler={editTaskHandler}
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
          },
        ]}
      />
      <TasksList
        editTaskHandler={editTaskHandler}
        header="Completed"
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
          },
        ]}
      />
    </>
  );
};

export default HomeContainer;
