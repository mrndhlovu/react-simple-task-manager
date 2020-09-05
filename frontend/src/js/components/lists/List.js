import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

import { requestList } from "../../apis/tasksApiRequests";
import { useMainContent } from "../../utils/hookUtils";
import CreateTask from "../shared/CreateTask";
import TasksList from "../tasks/TasksList";
import UILoadingSpinner from "../shared/UILoadingSpinner";

const List = () => {
  const history = useHistory();
  const { createTaskHandler, tasks } = useMainContent();
  const [isLoading, setIsLoading] = useState(true);
  const { listId } = useParams();

  const [list, setList] = useState(undefined);

  const TODOS = _.filter(tasks, { status: "todo", listName: list?.title });

  const INCOMPLETES = _.filter(tasks, {
    status: "incomplete",
    listName: list?.title,
  });

  const COMPLETED = _.filter(tasks, {
    status: "complete",
    listName: list?.title,
  });

  useEffect(() => {
    const getList = async () => {
      await requestList(listId)
        .then((res) => {
          setIsLoading(!isLoading);
          setList(res.data);
        })
        .catch(() => {
          setIsLoading(!isLoading);
          history.push("/");
        });
    };

    getList();
  }, [listId, history]);

  return (
    <>
      <CreateTask
        buttonText="Create New Task"
        handleButtonClick={(data) =>
          createTaskHandler({ ...data, listName: list?.title })}
        list={listId}
      />
      {isLoading ? (
        <UILoadingSpinner />
      ) : (
        <>
          <TasksList header="To Do" tasks={TODOS} />
          <TasksList header="In Complete" tasks={INCOMPLETES} />
          <TasksList header="Complete" tasks={COMPLETED} />
        </>
      )}
    </>
  );
};

export default List;
