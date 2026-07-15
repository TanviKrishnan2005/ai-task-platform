import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import api from "../api/axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  function icon(status) {
    switch (status) {
      case "Success":
        return <CheckCircle2 className="text-green-400" size={20} />;
      case "Running":
        return (
          <Loader2
            className="text-blue-400 animate-spin"
            size={20}
          />
        );
      case "Pending":
        return <Clock3 className="text-amber-400" size={20} />;
      case "Failed":
        return <XCircle className="text-red-400" size={20} />;
      default:
        return null;
    }
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto px-6 py-10">

        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="bg-slate-900 border-slate-800 text-white">

          <CardContent className="p-8">

            <h1 className="text-4xl font-bold mb-3">
              {task.title}
            </h1>

            <div className="flex items-center gap-3 mb-8">

              {icon(task.status)}

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${badge(
                  task.status
                )}`}
              >
                {task.status}
              </span>

            </div>

            <div className="space-y-8">

              <div>

                <h3 className="text-lg font-semibold mb-3">
                  Operation
                </h3>

                <div className="bg-slate-800 rounded-lg p-4 capitalize">
                  {task.operation}
                </div>

              </div>

              <div>

                <h3 className="text-lg font-semibold mb-3">
                  Input Text
                </h3>

                <div className="bg-slate-800 rounded-lg p-4 whitespace-pre-wrap min-h-[140px]">
                  {task.inputText}
                </div>

              </div>

              <div>

                <h3 className="text-lg font-semibold mb-3">
                  Result
                </h3>

                <div className="bg-slate-800 rounded-lg p-4 whitespace-pre-wrap min-h-[140px]">
                  {task.result || "Waiting for worker..."}
                </div>

              </div>

              <div>

                <h3 className="text-lg font-semibold mb-4">
                  Execution Logs
                </h3>

                {task.logs.length === 0 ? (

                  <div className="bg-slate-800 rounded-lg p-4 text-slate-400">
                    No logs yet.
                  </div>

                ) : (

                  <div className="space-y-3">

                    {task.logs.map((log, index) => (

                      <div
                        key={index}
                        className="bg-slate-800 rounded-lg p-4"
                      >

                        <p className="font-medium">
                          {log.message}
                        </p>

                        <p className="text-sm text-slate-400 mt-2">
                          {new Date(
                            log.timestamp
                          ).toLocaleString()}
                        </p>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}