const request = require("supertest");
const dotenv = require("dotenv");
const path = require("path");

const User = require("./../../models/User");
const { getAuthToken } = require("../../services/user.services");
dotenv.config({ path: path.resolve(__dirname, "../test.env") });

const TEST_USER = {
  firstName: "Ndhlovu",
  lastName: "Mduduzi",
  email: "ndhlovu@example.com",
  password: "userOneAuth",
};

describe("User routes", () => {
  const API_PREFIX = "/api/auth";
  let server;
  let token;
  let user;

  beforeEach(async () => {
    server = require("../../config/index.js");
    user = new User(TEST_USER);
    token = await getAuthToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();
  });

  const exec = () => {
    return request(server)
      .get(`${API_PREFIX}/me`)
      .set("Cookie", `access_token=${token}`);
  };

  afterEach(async (done) => {
    await User.deleteMany();
    done();
  });

  test("Should register a new user", async () => {
    const response = await request(server)
      .post(`${API_PREFIX}/register`)
      .send({ ...TEST_USER, email: "mduduzi@example.com" })
      .expect(201);

    expect(response.body.user.email).toBe("mduduzi@example.com");
    expect(response.body.lists.length).toBe(0);
    expect(response.body.tasks.length).toBe(0);
  });

  test("Should login a registered user", async () => {
    const response = await request(server)
      .post(`${API_PREFIX}/login`)
      .send({ email: TEST_USER.email, password: TEST_USER.password })
      .expect(200);

    expect(response.body.lists.length).toBe(0);
    expect(response.body.tasks.length).toBe(0);
  });

  test("Should not login a unregistered user", async () => {
    await request(server)
      .post(`${API_PREFIX}/login`)
      .send({ email: "random-email@example.com", password: TEST_USER.password })
      .expect(500);
  });

  test("Should get the current user profile", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  test("Should logout current user", async () => {
    await request(server)
      .post(`${API_PREFIX}/logout`)
      .set("Cookie", `access_token=${token}`)
      .expect(200);
  });

  test("Should update current user profile", async () => {
    await request(server)
      .patch(`${API_PREFIX}/update-user`)
      .send({
        email: "changedemail@example.com",
        password: "updatedAuthString",
      })
      .set("Cookie", `access_token=${token}`)
      .expect(200);
  });

  test("Should not update restricted user fields", async () => {
    await request(server)
      .patch(`${API_PREFIX}/update-user`)
      .send({ tokens: [] })
      .set("Cookie", `access_token=${token}`)
      .expect(400);
  });

  test("Should delete user profile", async () => {
    await request(server)
      .delete(`${API_PREFIX}/delete-account`)
      .set("Cookie", `access_token=${token}`)
      .expect(200);
  });
});
