import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

      await api.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">

          Register

        </h1>

        <input
          className="w-full p-3 rounded mb-4 bg-slate-700"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

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
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            className="text-blue-400 ml-2"
            to="/"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}