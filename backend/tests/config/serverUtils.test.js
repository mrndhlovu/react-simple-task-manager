const { getRandomNumber } = require("../../utils/serverUtils");

test("Should return a six digit number", () => {
  const number = getRandomNumber().toString();
  expect(number.length).toBe(6);
});
