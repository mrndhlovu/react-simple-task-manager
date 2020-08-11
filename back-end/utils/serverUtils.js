const getRandom = (multiplier = 10) =>
  Math.floor(10000 * multiplier + Math.random() * 900000);
const tokenExpirationTime = 86400000;
module.exports = { getRandom, tokenExpirationTime };
