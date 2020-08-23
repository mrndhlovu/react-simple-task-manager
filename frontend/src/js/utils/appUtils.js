/* eslint-disable curly */
/* eslint-disable indent */
/* eslint-disable nonblock-statement-body-position */
import moment from "moment";

export const getValidUpdateFields = (data, allowedUpdates) => {
  const filtered = Object.keys(data)
    .filter((key) => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};

export const resetForm = (data) => {
  if (typeof data === "object")
    return data.forEach((id) => {
      document.getElementById(id).value = "";
    });
  // eslint-disable-next-line no-return-assign
  return (document.getElementById(data).value = "");
};

export const capitalize = (string) => {
  const result = string
    ? `${string.charAt(0).toUpperCase()}${string.slice(1)}`
    : "";
  return result;
};

export const getLocaleString = () => {
  // eslint-disable-next-line newline-per-chained-call
  const result = moment().format().split(":").slice(0, 2).join(":");
  return result;
};

export const getFormattedDateString = (date, status) => {
  const taskDate = new Date(date).getTime();
  const isExpired = Date.now() > taskDate;

  // eslint-disable-next-line curly
  if (isExpired && status !== "complete ")
    return moment(taskDate).subtract(3, "days").calendar();

  return moment(taskDate).format("llll");
};

export const taskStylingClassName = (status, date) => {
  const taskDate = new Date(date).getTime();
  const isExpired = Date.now() > taskDate;

  return `${
    // eslint-disable-next-line no-nested-ternary
    (status === "incomplete" || status === "todo") && isExpired
      ? "task__expired"
      : status === "complete"
      ? "task__completed"
      : "task__todo"
  }`;
};
