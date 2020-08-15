const router = require("express").Router();

const List = require("../../models/List");
const Task = require("../../models/Task");

const {
  ALLOWED_UPDATE_TASK_FIELDS,
  ALLOWED_UPDATE_LIST_FIELDS,
} = require("../../utils/config.js");

const { auth } = require("../../middleware/authMiddleware");

router.post("/create-task", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/id/:taskId", auth, async (req, res) => {
  const _id = req.params.taskId;
  const task = await Task.findOne({ _id, owner: req.user._id });

  try {
    if (!task) return res.status(400).send("Task not found!");

    await task.populate("owner").execPopulate();
    await task.populate("list").execPopulate();

    res.send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/id/:taskId/delete-task", auth, async (req, res) => {
  const _id = req.params.taskId;
  const task = await Task.findOne({ _id, owner: req.user._id });
  try {
    if (!task) return res.status(400).send("Task not found!");

    await task.delete();

    res.send({ message: "Task deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/id/:taskId/update-task", auth, async (req, res) => {
  const _id = req.params.taskId;

  const task = await Task.findOne({ _id, owner: req.user._id });

  const updates = Object.keys(req.body);

  const isValidField = updates.every((update) =>
    ALLOWED_UPDATE_TASK_FIELDS.includes(update)
  );

  try {
    if (!isValidField)
      return res.status(400).send({ message: "Invalid update field!" });

    if (!task) return res.status(400).send({ message: "Task not found!" });

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create-list", auth, async (req, res) => {
  const list = new List({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await list.save();
    res.send(list);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/all-lists", auth, async (req, res) => {
  try {
    const lists = await List.find({ owner: req.user._id });

    res.send(lists);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/id/:listId/list", auth, async (req, res) => {
  const _id = req.params.listId;
  const list = await List.findOne({ _id, owner: req.user._id });

  try {
    if (!list) return res.status(400).send("List not found!");

    await list.populate("tasks").execPopulate();

    res.send(list);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/id/:listId/delete-list", auth, async (req, res) => {
  const _id = req.params.listId;
  const list = await List.findOne({ _id, owner: req.user._id });
  try {
    if (!list) return res.status(400).send("List not found!");

    await list.delete();

    res.send({ message: "List deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/id/:taskId/update-list", auth, async (req, res) => {
  const _id = req.params.taskId;

  const list = await List.findOne({ _id, owner: req.user._id });

  const updates = Object.keys(req.body);

  const isValidField = updates.every((update) =>
    ALLOWED_UPDATE_LIST_FIELDS.includes(update)
  );

  try {
    if (!isValidField)
      return res.status(400).send({ message: "Invalid update field!" });

    if (!list) return res.status(400).send({ message: "List not found!" });

    updates.forEach((update) => (list[update] = req.body[update]));
    await list.save();
    res.send(list);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
