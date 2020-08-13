import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { requestList } from "../../apis/tasksApiRequests";
import { useMainContent } from "../../utils/hookUtils";
import CreateTask from "../shared/CreateTask";
import TasksList from "../tasks/TasksList";

const List = () => {
  const history = useHistory();
  const { createTaskHandler, tasks } = useMainContent();
  const { listId } = useParams();

  const [list, setList] = useState(undefined);

  const TODOS =
    tasks &&
    tasks.filter((task) => task.status === "todo" && task?.list === listId);
  const COMPLETED =
    tasks &&
    tasks.filter((task) => task.status === "complete" && task?.list === listId);
  const INCOMPLETES =
    tasks &&
    tasks.filter(
      (task) => task.status === "incomplete" && task?.list === listId
    );

  const hasTodos = TODOS.length !== 0;
  const hasCompleted = COMPLETED.length !== 0;
  const hasInCompleted = INCOMPLETES.length !== 0;

  useEffect(() => {
    const getList = async () => {
      await requestList(listId)
        .then((res) => {
          setList(res.data);
        })
        .catch(() => {
          history.push("/");
        });
    };

    getList();
  }, [listId, history]);

  return (
    <>
      <CreateTask
        header={(list?.title && `${list?.title} list`) || "Create New Task"}
        buttonText="Create New Task"
        handleButtonClick={(data) => createTaskHandler({ ...data, listId })}
      />

      {hasTodos && <TasksList header="To Do" tasks={TODOS} />}

      {hasInCompleted && <TasksList header="In Complete" tasks={INCOMPLETES} />}

      {hasCompleted && <TasksList header="Complete" tasks={COMPLETED} />}
    </>
  );
};

// List.propTypes = {};

export default List;
