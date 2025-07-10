import Link from "next/link";
import { UserIcon, ArrowLeftIcon, LogOutIcon } from "lucide-react";

export default function UserProfile({ params }: any) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
                {/* Profile Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                        <UserIcon className="h-8 w-8" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
                <p className="text-sm text-gray-500 mb-4">Here are your basic profile details.</p>

                {/* User ID Section */}
                <div className="mb-4 text-left">
                    <label className="block text-sm text-gray-600">User ID</label>
                    <p className="mt-1 px-4 py-2 bg-orange-100 text-orange-700 rounded font-mono break-all text-sm">
                        {params.id}
                    </p>
                </div>

                {/* Additional Info (mock data for now) */}
                <div className="mb-4 text-left">
                    <label className="block text-sm text-gray-600">Email</label>
                    <p className="mt-1 px-4 py-2 bg-gray-100 text-gray-800 rounded">user@example.com</p>
                </div>

                <div className="mb-4 text-left">
                    <label className="block text-sm text-gray-600">Status</label>
                    <p className="mt-1 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Active
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-6">
                    <Link
                        href="/profile"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back
                    </Link>
                    <Link
                        href="/login"
                        className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                    >
                        <LogOutIcon className="h-4 w-4" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
