import { Worker } from "bullmq";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

import connection from "../queue/redis.js";
import Task from "../models/Task.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to worker/processor.py
const pythonFile = path.resolve(
  __dirname,
  "../../../worker/processor.py"
);

const worker = new Worker(
  "task-queue",
  async (job) => {
    const { taskId } = job.data;

    console.log(`🚀 Processing Task: ${taskId}`);

    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Update status to Running
    task.status = "Running";
    task.logs.push({
      message: "Task execution started",
    });
    await task.save();

    // Run Python script and wait for it
    const result = await new Promise((resolve, reject) => {
      const python = spawn("python", [
        pythonFile,
        task.operation,
        task.inputText,
      ]);

      let output = "";
      let errorOutput = "";

      python.stdout.on("data", (data) => {
        output += data.toString();
      });

      python.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      python.on("close", (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(errorOutput || "Python process failed"));
        }
      });
    });

    // Update MongoDB
    task.status = "Success";
    task.result = result;

    task.logs.push({
      message: "Task completed successfully",
    });

    await task.save();

    console.log(`✅ Task ${taskId} completed`);
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", async (job, err) => {
  console.error("❌ Job Failed:", err.message);

  if (!job) return;

  await Task.findByIdAndUpdate(job.data.taskId, {
    status: "Failed",
    $push: {
      logs: {
        message: err.message,
      },
    },
  });
});

console.log("✅ BullMQ Worker Started");