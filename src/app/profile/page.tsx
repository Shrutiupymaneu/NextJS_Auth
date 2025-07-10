"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error: any) {
            toast.error("Failed to fetch user details");
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Profile</h1>
                <p className="text-gray-600 mb-6">Manage your account here</p>

                <div className="mb-4 w-full">
                    <label className="block text-sm text-gray-500 mb-1">User ID:</label>
                    <h2 className="p-2 bg-green-100 text-green-800 rounded font-mono break-all">
                        {data
                            ? <Link href={`/profile/${data}`} className="hover:underline">{data}</Link>
                            : "Not fetched yet"}
                    </h2>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <button
                        onClick={getUserDetails}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
                    >
                        Get User Details
                    </button>

                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
                    >
                        Logout
                    </button>
                </div>

                <Link href="/login" className="mt-6 text-sm text-blue-600 hover:underline">
                    Go to Login
                </Link>
            </div>
        </div>
    );
}
