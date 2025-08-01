// ✅ src/app/profile/[id]/page.tsx
import React from "react";

interface PageProps {
  params: { id: string };
}

export default function UserProfile({ params }: PageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile ID Page</h1>
      <p className="text-4xl">
        Profile ID:{" "}
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
