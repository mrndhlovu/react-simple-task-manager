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
