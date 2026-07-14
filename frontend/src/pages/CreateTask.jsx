import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    inputText: "",
    operation: "uppercase",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", form);

      alert("Task Created Successfully!");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[500px] shadow-lg"
      >

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Create AI Task
        </h1>

        <input
          className="w-full p-3 rounded bg-slate-700 text-white mb-4"
          placeholder="Task Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          className="w-full p-3 rounded bg-slate-700 text-white mb-4 h-36"
          placeholder="Input Text"
          name="inputText"
          value={form.inputText}
          onChange={handleChange}
        />

        <select
          className="w-full p-3 rounded bg-slate-700 text-white mb-6"
          name="operation"
          value={form.operation}
          onChange={handleChange}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="reverse">Reverse String</option>
          <option value="wordcount">Word Count</option>
        </select>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Create Task
        </button>

      </form>

    </div>
  );
}