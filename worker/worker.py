import os
import json
import redis
from bson import ObjectId
from pymongo import MongoClient
from dotenv import load_dotenv

from processor import process_text

load_dotenv()

# MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["test"]
tasks = db["tasks"]

# Redis
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    decode_responses=True,
)

print("✅ Worker Started...")

while True:
    try:
        # Wait indefinitely for a job
        job = redis_client.brpop("task-queue", timeout=0)

        if not job:
            continue

        payload = json.loads(job[1])
        task_id = payload["taskId"]

        task = tasks.find_one({
            "_id": ObjectId(task_id)
        })

        if not task:
            print("Task not found")
            continue

        print(f"🚀 Processing: {task['title']}")

        tasks.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "Running"
                },
                "$push": {
                    "logs": {
                        "message": "Task started"
                    }
                }
            }
        )

        result = process_text(
            task["inputText"],
            task["operation"]
        )

        tasks.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "Success",
                    "result": result
                },
                "$push": {
                    "logs": {
                        "message": "Task completed successfully"
                    }
                }
            }
        )

        print("✅ Done")

    except Exception as e:
        print("Worker Error:", e)