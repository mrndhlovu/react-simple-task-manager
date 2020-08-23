const request = require("supertest");
const dotenv = require("dotenv");
const path = require("path");

const User = require("./../../models/User");
const Task = require("./../../models/Task");
const List = require("./../../models/List");
const { getAuthToken } = require("../../services/user.services");
dotenv.config({ path: path.resolve(__dirname, "../test.env") });

const TEST_TASK = {
  title: "Test task",
  dueDate: "23/08/2019",
};

const TEST_LIST = {
  title: "Test task",
  dueDate: "23/08/2019",
};

const TEST_USER = {
  firstName: "Ndhlovu",
  lastName: "Mduduzi",
  email: "ndhlovu@example.com",
  password: "userOneAuth",
};

describe("Tasks routes", () => {
  const API_PREFIX = "/api/tasks";
  let server;
  let token;
  let user;
  let task;
  let list;

  beforeEach(async () => {
    server = require("../../config/index.js");
    user = new User(TEST_USER);
    token = await getAuthToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    task = new Task({ ...TEST_TASK, owner: user._id });
    await task.save();
    list = new List({ ...TEST_LIST, owner: user._id });
    await list.save();
  });

  afterEach(async (done) => {
    await Task.deleteMany();
    await List.deleteMany();
    await User.deleteMany();
    done();
  });

  const exec = (endPoint) => {
    return request(server).get(endPoint).set("Cookie", `access_token=${token}`);
  };

  test("Should create a new list", async () => {
    const response = await request(server)
      .post(`${API_PREFIX}/create-task`)
      .set("Cookie", `access_token=${token}`)
      .send({ ...TEST_LIST })
      .expect(201);

    expect(response.body._id).toBeTruthy();
  });

  test("Should get all user lists", async () => {
    const res = await exec(`${API_PREFIX}/all-lists`);

    expect(res.status).toBe(200);
  });

  test("Should get a list by id", async () => {
    const res = await exec(`${API_PREFIX}/id/${list._id}/list`);

    expect(res.status).toBe(200);
  });

  test("Should delete a task by id", async () => {
    await request(server)
      .delete(`${API_PREFIX}/id/${list._id}/delete-list`)
      .set("Cookie", `access_token=${token}`)
      .expect(200);

    const listItem = await List.findById(list._id);
    expect(listItem).toBeNull();
  });

  test("Should update list", async () => {
    const res = await request(server)
      .patch(`${API_PREFIX}/id/${list._id}/update-list`)
      .send({
        title: "List title changed",
      })
      .set("Cookie", `access_token=${token}`)
      .expect(200);

    expect(res.body.title).toBe("List title changed");
  });
});
