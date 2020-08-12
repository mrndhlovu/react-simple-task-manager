import React from "react";

import CreateTask from "../components/tasks/CreateTask";
import TasksList from "../components/tasks/TasksList";
import { useHistory } from "react-router";

const HomeContainer = () => {
  const history = useHistory();

  const editTaskHandler = (action, task) => {
    switch (action) {
      case "delete":
        console.log(" -> delete");

        break;

      case "edit":
        history.push(`/edit-task/${task.id}`);
        break;

      case "incomplete":
        console.log("editTaskHandler -> incomplete");
        break;

      case "complete":
        console.log("editTaskHandler -> complete");
        break;

      default:
        break;
    }
  };

  const handleChange = (field, e) => {
    console.log("handleChange -> field, e", field, e);
  };

  const handleCreateTask = (field, e) => {
    console.log("handleChange -> field, e", field, e);
  };

  return (
    <>
      <CreateTask
        handleChange={handleChange}
        handleClick={() => handleCreateTask()}
      />
      <TasksList
        editTaskHandler={editTaskHandler}
        header="To Do"
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
            id: 1,
          },
        ]}
      />

      <TasksList
        header="In Complete"
        editTaskHandler={editTaskHandler}
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
            id: 2,
          },
        ]}
      />

      <TasksList
        editTaskHandler={editTaskHandler}
        header="Complete"
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
            id: 3,
          },
        ]}
      />
    </>
  );
};

export default HomeContainer;
