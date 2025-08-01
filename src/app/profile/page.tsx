"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <button onClick={getUserDetails}>Get Details</button>
      {data && (
        <Link href={`/profile/${data}`} className="bg-green-500 p-2 mt-4 rounded text-black">
          {data}
        </Link>
      )}
      <button onClick={logout} className="bg-blue-500 text-white p-2 mt-4 rounded">
        Logout
      </button>
    </div>
  );
}
