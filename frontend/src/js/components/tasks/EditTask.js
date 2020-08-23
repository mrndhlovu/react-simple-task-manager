import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { EDITABLE_TASK_FIELDS } from "../../constants/constants";
import { getValidUpdateFields } from "../../utils/appUtils";
import { requestTask } from "../../apis/tasksApiRequests";
import { useMainContent } from "../../utils/hookUtils";
import CreateTask from "../shared/CreateTask";

const EditTask = () => {
  const { taskId } = useParams();
  const { updatedTaskHandler, tasks, notify } = useMainContent();
  const [task, setTask] = useState(undefined);

  const editTaskHandler = async (newTask) => {
    const body = getValidUpdateFields(newTask, EDITABLE_TASK_FIELDS);
    const taskIndex = tasks.indexOf(task);

    updatedTaskHandler(body, taskId, taskIndex, (data, error) => {
      if (error) return notify(error?.response.data?.error);
      return setTask(data);
    });
  };

  useEffect(() => {
    const getTask = async () => {
      await requestTask(taskId)
        .then((res) => {
          setTask(res.data);
        })
        .catch((error) => {
          notify(error?.response.data?.error);
        });
    };
    getTask();
  }, [taskId]);

  return task ? (
    <CreateTask
      header="Edit Task"
      task={task}
      handleButtonClick={editTaskHandler}
      buttonText="Save Changes"
    />
  ) : (
    <div>Loading...</div>
  );
};

export default EditTask;
