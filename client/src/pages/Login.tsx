import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { signin } from "../services/auth.services";
import axios from "axios";

import authBackground from "../assets/ChatGPT Image Jul 17, 2026, 10_15_46 PM.png";

import { useAuth } from "../hooks/useAuth";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await signin({
                email,
                password,
            });

            await login(response.token);

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
            <div 
                className="hidden lg:block bg-cover bg-center"
                style={{
                    backgroundImage: `url(${authBackground})`
                }}
            />

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-center bg-gray-50 px-6">
                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
                    <h2 className="text-3xl text-indigo-800 font-bold ml-28 mb-4">TaskFlow</h2>
                    <h3 className="text-2xl font-bold text-gray-900">
                        Welcome back
                    </h3>

                    <p className=" mb-6 text-gray-500">
                        Signin to your Account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="xyz@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && (
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Log In"}
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