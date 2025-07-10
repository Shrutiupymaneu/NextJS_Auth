import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Clear the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiration to the past
            maxAge: 0,
            path: "/", // optional: clear from all paths
        });

        return response;
    } catch (error: any) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
