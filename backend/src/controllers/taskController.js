import Task from "../models/Task.js";
import redis from "../queue/redis.js";

// =======================
// Create Task
// =======================
export const createTask = async (req, res) => {
  try {
    const { title, inputText, operation } = req.body;

    if (!title || !inputText || !operation) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const task = await Task.create({
      title,
      inputText,
      operation,
      createdBy: req.user.id,
      status: "Pending",
      result: "",
      logs: [],
    });

    // Push task into Redis queue
    await redis.lpush(
      "task-queue",
      JSON.stringify({
        taskId: task._id.toString(),
      })
    );

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =======================
// Get All Tasks
// =======================
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(tasks);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// =======================
// Get Single Task
// =======================
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json(task);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};