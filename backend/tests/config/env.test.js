const dotenv = require("dotenv");

dotenv.config();

const {
  PUBLIC_SIGNATURE,
  PRIVATE_SIGNATURE,
  TOKEN_SIGNATURE,
  MONGODB_URI,
  PRODUCTION,
} = process.env;

test("Should have the correct environment variables", () => {
  const variables = [
    PUBLIC_SIGNATURE,
    PRIVATE_SIGNATURE,
    TOKEN_SIGNATURE,
    MONGODB_URI,
  ];

  variables.map((key) => {
    if (PRODUCTION) {
      expect(key).toBeTruthy();
    }
  });
});
