import moment from "moment";

export const getValidUpdateFields = (data, allowedUpdates) => {
  const filtered = Object.keys(data)
    .filter((key) => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};

export const resetForm = (data) => {
  if (typeof data === "object")
    return data.forEach((id) => (document.getElementById(id).value = ""));
  document.getElementById(data).value = "";
};

export const capitalize = (string) =>
  string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : "";

export const getLocaleString = () =>
  moment().format().split(":").slice(0, 2).join(":");

export const getFormattedDateString = (date, status) => {
  const taskDate = new Date(date).getTime();
  const isExpired = Date.now() > taskDate;

  if (isExpired && status !== "complete ")
    return moment(taskDate).subtract(3, "days").calendar();

  return moment(taskDate).format("llll");
};

export const taskStylingClassName = (status, date) => {
  const taskDate = new Date(date).getTime();
  const isExpired = Date.now() > taskDate;

  return `${
    (status === "incomplete" || status === "todo") && isExpired
      ? "task__expired"
      : status === "complete"
      ? "task__completed"
      : "task__todo"
  }`;
};
