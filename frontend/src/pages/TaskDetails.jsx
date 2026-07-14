import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();

    const interval = setInterval(fetchTask, 3000);

    return () => clearInterval(interval);
  }, []);

  async function fetchTask() {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  function statusColor(status) {
    switch (status) {
      case "Success":
        return "bg-green-600";
      case "Running":
        return "bg-yellow-500 text-black";
      case "Pending":
        return "bg-blue-600";
      case "Failed":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8 space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            {task.title}
          </h1>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full ${statusColor(task.status)}`}
          >
            {task.status}
          </span>

        </div>

        <div>

          <h2 className="text-lg font-semibold mb-2">
            Operation
          </h2>

          <p className="capitalize">
            {task.operation}
          </p>

        </div>

        <div>

          <h2 className="text-lg font-semibold mb-2">
            Input
          </h2>

          <div className="bg-slate-800 p-4 rounded-lg whitespace-pre-wrap">
            {task.inputText}
          </div>

        </div>

        <div>

          <h2 className="text-lg font-semibold mb-2">
            Result
          </h2>

          <div className="bg-slate-800 p-4 rounded-lg whitespace-pre-wrap">
            {task.result || "No Result Yet"}
          </div>

        </div>

        <div>

          <h2 className="text-lg font-semibold mb-4">
            Execution Logs
          </h2>

          <div className="space-y-3">

            {task.logs.length === 0 ? (

              <p className="text-slate-400">
                No Logs
              </p>

            ) : (

              task.logs.map((log, index) => (

                <div
                  key={index}
                  className="bg-slate-800 p-3 rounded-lg"
                >
                  <p>{log.message}</p>

                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}