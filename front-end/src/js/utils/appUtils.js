export const getValidUpdateFields = (data, allowedUpdates) => {
  const filtered = Object.keys(data)
    .filter((key) => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};
