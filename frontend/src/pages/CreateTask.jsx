import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  ArrowRight,
  FileText,
  WandSparkles,
} from "lucide-react";

import api from "../api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateTask() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] =useState({
    title: "",
    inputText: "",
    operation: "uppercase",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/tasks", form);

      alert("Task Created Successfully!");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

      <Card className="w-full max-w-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl rounded-2xl">

        <CardContent className="p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">

              <BrainCircuit size={28} />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Create AI Task
              </h1>

              <p className="text-slate-400">
                Submit a task for asynchronous processing.
              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Task Title
              </label>

              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Convert report to uppercase"
                className="bg-slate-950 border-slate-700 h-11"
              />

            </div>

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Input Text
              </label>

              <textarea
                name="inputText"
                value={form.inputText}
                onChange={handleChange}
                rows={8}
                placeholder="Enter text to process..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />

            </div>

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                AI Operation
              </label>

              <div className="relative">

                <WandSparkles
                  className="absolute left-3 top-3 text-violet-400"
                  size={18}
                />

                <select
                  name="operation"
                  value={form.operation}
                  onChange={handleChange}
                  className="w-full h-11 rounded-md border border-slate-700 bg-slate-950 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="uppercase">Uppercase</option>
                  <option value="lowercase">Lowercase</option>
                  <option value="reverse">Reverse String</option>
                  <option value="wordcount">Word Count</option>
                </select>

              </div>

            </div>

            <div className="flex justify-end gap-4 pt-4">

              <Button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-slate-700 hover:bg-slate-600 text-white"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                <FileText className="mr-2 h-4 w-4" />

                {loading ? "Creating..." : "Create Task"}

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}