import React from "react";
// import PropTypes from "prop-types";

import CreateTask from "../tasks/CreateTask";
import TasksList from "../tasks/TasksList";

const List = () => {
  return (
    <>
      <CreateTask />

      <TasksList
        header="To Do"
        tasks={[
          {
            title: "take out bins",
            dueDate: "Tuesday 11th August",
            id: 1,
          },
        ]}
      />
    </>
  );
};

// List.propTypes = {};

export default List;
