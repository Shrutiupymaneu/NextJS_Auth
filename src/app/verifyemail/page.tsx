"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      {verified && (
        <>
          <h2 className="text-2xl text-green-600 mt-4">Email Verified ✅</h2>
          <Link className="mt-4 text-blue-500 underline" href="/login">
            Go to Login
          </Link>
        </>
      )}
      {error && (
        <h2 className="text-2xl text-red-600 mt-4">Invalid or Expired Link ❌</h2>
      )}
    </div>
  );
}
