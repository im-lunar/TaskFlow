import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { signin } from "../services/auth.services";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await signin({
                email,
                password,
            });

            navigate("/dashboard");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Something went wrong. Please try again");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT SECTION */}

            <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-700 to-indigo-500 text-white px-20">

                <h1 className="text-6xl font-bold">
                    TaskFlow
                </h1>

                <p className="mt-8 text-xl leading-relaxed text-indigo-100 max-w-md">
                    Organize projects, manage tasks, and collaborate
                    effortlessly with your team—all in one place.
                </p>

                <div className="mt-16 space-y-6">

                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            ✓
                        </div>

                        <span className="text-lg">
                            Create unlimited workspaces
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            ✓
                        </div>

                        <span className="text-lg">
                            Organize tasks with Kanban boards
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            ✓
                        </div>

                        <span className="text-lg">
                            Collaborate with your team
                        </span>
                    </div>

                </div>

            </div>

            {/* RIGHT SECTION */}

            <div className="flex items-center justify-center bg-gray-50 px-6">

                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back
                    </h2>

                    <p className="mt-2 mb-8 text-gray-500">
                        Signin to your Account
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <Input
                            label="Email"
                            type="email"
                            placeholder="xyz@gmail.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        {error && (
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <Button 
                            type="submit"
                            disabled={loading}
                        >
                            {loading? "Signin in...":"Log In"}
                        </Button>

                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-indigo-600 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;