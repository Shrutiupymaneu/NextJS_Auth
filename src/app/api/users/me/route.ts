import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        // Extract user ID from token
        const userId = await getDataFromToken(request);

        // Find user by ID and exclude password
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user,
        });

    } catch (error: any) {
        console.error("User fetch error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch user" },
            { status: 400 }
        );
    }
}
