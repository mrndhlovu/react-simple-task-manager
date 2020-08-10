export const updateObject = (oldObject, propsUpdated) => {
  return {
    ...oldObject,
    ...propsUpdated
  };
};
