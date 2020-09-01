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

  test("Should create a new task", async () => {
    const response = await request(server)
      .post(`${API_PREFIX}/create-task`)
      .set("Cookie", `access_token=${token}`)
      .send({ ...TEST_TASK })
      .expect(201);

    expect(response.body._id).toBeTruthy();
  });

  test("Should create a new task with list as a parent", async () => {
    const response = await request(server)
      .post(`${API_PREFIX}/create-task`)
      .set("Cookie", `access_token=${token}`)
      .send({ ...TEST_TASK, list: list._id, listName: list.title })
      .expect(201);

    expect(response.body.list.toString()).toBe(list._id.toString());
  });

  test("Should get list of tasks", async () => {
    const res = await exec(`${API_PREFIX}/all`);
    expect(res.status).toBe(200);
  });

  test("Should not get tasks when not authenticated", async () => {
    await request(server).get(`${API_PREFIX}/all`).expect(401);
  });

  test("Should get a task by id", async () => {
    const res = await exec(`${API_PREFIX}/id/${task._id}`);

    expect(res.status).toBe(200);
  });

  test("Should delete a task by id", async () => {
    await request(server)
      .delete(`${API_PREFIX}/id/${task._id}/delete-task`)
      .set("Cookie", `access_token=${token}`)
      .expect(200);

    const taskItem = await Task.findById(task._id);
    expect(taskItem).toBeNull();
  });

  test("Should update task", async () => {
    await request(server)
      .patch(`${API_PREFIX}/id/${task._id}/update-task`)
      .send({
        title: "Title changed",
        status: "complete",
      })
      .set("Cookie", `access_token=${token}`)
      .expect(200);
  });

  test("Should not update restricted task fields", async () => {
    await request(server)
      .patch(`${API_PREFIX}/id/${task._id}/update-task`)
      .send({ list: "Life" })
      .set("Cookie", `access_token=${token}`)
      .expect(400);
  });
});
