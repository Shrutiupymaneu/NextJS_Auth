"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {loading ? "Logging in..." : "Login to Your Account"}
                </h1>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm text-gray-600">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm text-gray-600">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled}
                        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
                            buttonDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Please wait..." : "Login"}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
