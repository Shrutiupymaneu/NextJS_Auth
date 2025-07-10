import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Helper function to extract user ID from JWT cookie
export const getDataFromToken = (request: NextRequest): string => {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            throw new Error("No token found in cookies");
        }

        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment");
        }

        const decodedToken = jwt.verify(token, secret) as JwtPayload;

        if (!decodedToken || typeof decodedToken === "string" || !decodedToken.id) {
            throw new Error("Invalid token payload");
        }

        return decodedToken.id;
    } catch (error: any) {
        console.error("Token decode error:", error);
        throw new Error(error.message || "Failed to verify token");
    }
};
