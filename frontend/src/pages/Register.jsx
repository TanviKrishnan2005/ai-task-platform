import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Sparkles, ArrowRight } from "lucide-react";

import api from "../api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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
      await api.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white grid lg:grid-cols-2">

      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-center px-20">

        <div className="flex items-center gap-4 mb-10">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center shadow-lg">
            <BrainCircuit size={28} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              AI Task Platform
            </h1>

            <p className="text-slate-400 text-lg">
              Asynchronous Processing Engine
            </p>

          </div>

        </div>

        <h2 className="text-5xl xl:text-6xl font-black leading-tight">

          Build.

          <br />

          Execute.

          <br />

          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Monitor.
          </span>

        </h2>

        <p className="mt-8 text-slate-400 text-xl leading-9 max-w-xl">

          Create your account and start executing AI tasks with
          asynchronous processing powered by Redis, Python workers,
          and MongoDB.

        </p>

        <div className="mt-12 space-y-5 text-lg">

          <div className="flex items-center gap-3">
            <Sparkles className="text-violet-400" />
            Secure Authentication
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="text-violet-400" />
            Queue-Based Processing
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="text-violet-400" />
            Live Task Status
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="text-violet-400" />
            Scalable Architecture
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center lg:justify-start px-16">

        <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-2xl rounded-2xl">

          <CardContent className="p-8">

            <h2 className="text-3xl font-bold mb-2">
              Create Account 🚀
            </h2>

            <p className="text-slate-400 mb-8">
              Join the AI Task Platform.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <Input
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white"
              >
                {loading ? "Creating Account..." : "Register"}

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </form>

            <p className="text-center text-sm text-slate-400 mt-8">

              Already have an account?

              <Link
                to="/"
                className="ml-2 text-violet-400 hover:text-violet-300 font-medium"
              >
                Login
              </Link>

            </p>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}