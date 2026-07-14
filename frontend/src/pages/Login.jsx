import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await api.post("/auth/login", form);

      login(res.data.user, res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Task Platform
        </h1>

        <input
          className="w-full p-3 rounded mb-4 bg-slate-700"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded mb-4 bg-slate-700"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded"
        >
          Login
        </button>

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            className="text-blue-400 ml-2"
            to="/register"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}