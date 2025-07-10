"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const { email, password, username } = user;
        setButtonDisabled(!(email && password && username));
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {loading ? "Creating Account..." : "Sign Up"}
                </h1>
                <p className="text-gray-600 mb-6">Create your new account below</p>

                <div className="flex flex-col gap-4 w-full">
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-600 mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Enter username"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter email"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter password"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                            buttonDisabled
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
