import { Queue } from "bullmq";
import connection from "./redis.js";

const taskQueue = new Queue("task-queue", {
  connection,
});

export default taskQueue;