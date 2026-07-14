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
    decode_responses=True
)

print("✅ Worker Started...")

while True:

    job = redis_client.brpop("bull:task-queue:wait")

    if not job:
        continue

    try:

        payload = json.loads(job[1])

        task_id = payload["data"]["taskId"]

        task = tasks.find_one({
            "_id": ObjectId(task_id)
        })

        if not task:
            continue

        print(f"Processing {task['title']}")

        tasks.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "Running"
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

        print("Done")

    except Exception as e:

        print(e)