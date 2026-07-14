import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchTasks();

    const interval = setInterval(() => {
      fetchTasks();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function fetchTasks() {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            AI Task Platform
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome, <span className="font-semibold">{user?.name}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-semibold">
          Your Tasks ({tasks.length})
        </h2>

        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          + Create Task
        </button>

      </div>

      {tasks.length === 0 ? (

        <div className="bg-slate-900 rounded-xl p-12 text-center text-slate-400">
          No tasks created yet.
        </div>

      ) : (

        <div className="overflow-x-auto rounded-xl">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Operation</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Result</th>

                <th className="p-4 text-left">Created</th>

              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr
                  key={task._id}
                  onClick={() => navigate(`/task/${task._id}`)}
                  className="border-b border-slate-800 hover:bg-slate-900 cursor-pointer transition"
                >

                  <td className="p-4 font-medium">
                    {task.title}
                  </td>

                  <td className="p-4 capitalize">
                    {task.operation}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(task.status)}`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="p-4 max-w-xs truncate">
                    {task.result || "-"}
                  </td>

                  <td className="p-4 text-slate-400">
                    {new Date(task.createdAt).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}