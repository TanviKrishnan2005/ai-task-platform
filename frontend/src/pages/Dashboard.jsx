import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  Plus,
  LogOut,
  Clock3,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const { logout, user } = useAuth();

  useEffect(() => {
    fetchTasks();

    const interval = setInterval(fetchTasks, 3000);

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

  const pending = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const running = tasks.filter(
    (t) => t.status === "Running"
  ).length;

  const success = tasks.filter(
    (t) => t.status === "Success"
  ).length;

  const failed = tasks.filter(
    (t) => t.status === "Failed"
  ).length;

  function badge(status) {
    switch (status) {
      case "Success":
        return "bg-green-600";

      case "Running":
        return "bg-blue-600";

      case "Pending":
        return "bg-amber-500 text-black";

      case "Failed":
        return "bg-red-600";

      default:
        return "bg-slate-700";
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">

            <BrainCircuit size={28} />

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              AI Task Platform
            </h1>

            <p className="text-slate-400">
              Welcome back, {user?.name}
            </p>

          </div>

        </div>

        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout

        </Button>

      </div>

      <div className="grid md:grid-cols-4 gap-5 mb-10">

        <Card className="bg-slate-900 border-slate-800 text-white">

          <CardContent className="p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Pending
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {pending}
                </h2>

              </div>

              <Clock3 className="text-amber-400" />

            </div>

          </CardContent>

        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">

          <CardContent className="p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Running
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {running}
                </h2>

              </div>

              <Loader2 className="text-blue-400" />

            </div>

          </CardContent>

        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">

          <CardContent className="p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Success
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {success}
                </h2>

              </div>

              <CheckCircle2 className="text-green-400" />

            </div>

          </CardContent>

        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">

          <CardContent className="p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Failed
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {failed}
                </h2>

              </div>

              <XCircle className="text-red-400" />

            </div>

          </CardContent>

        </Card>

      </div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Tasks
        </h2>

        <Button
          className="bg-violet-600 hover:bg-violet-700"
          onClick={() => navigate("/create")}
        >
          <Plus className="mr-2 h-4 w-4" />

          Create Task

        </Button>

      </div>

      <div className="rounded-xl overflow-hidden border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="text-left p-4">
                Title
              </th>

              <th className="text-left p-4">
                Operation
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Result
              </th>

              <th className="text-left p-4">
                Created
              </th>

            </tr>

          </thead>

          <tbody>
                        {tasks.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-12 text-slate-400"
                >
                  No tasks created yet.
                </td>

              </tr>

            ) : (

              tasks.map((task) => (

                <tr
                  key={task._id}
                  onClick={() => navigate(`/task/${task._id}`)}
                  className="cursor-pointer border-t border-slate-800 hover:bg-slate-900 transition"
                >

                  <td className="p-4 font-medium">
                    {task.title}
                  </td>

                  <td className="p-4 capitalize">
                    {task.operation}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${badge(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="p-4 max-w-xs truncate text-slate-300">
                    {task.result || "-"}
                  </td>

                  <td className="p-4 text-slate-400">
                    {new Date(
                      task.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}