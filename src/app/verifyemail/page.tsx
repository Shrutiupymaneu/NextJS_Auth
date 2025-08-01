"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]); // ✅ include the function as dependency if it's defined inline

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Verify Email</h1>
      {verified && (
        <>
          <h2>Email Verified!</h2>
          <Link href="/login">Go to Login</Link>
        </>
      )}
      {error && <h2 className="bg-red-500 p-2 text-black">Invalid or Expired Link</h2>}
    </div>
  );
}
