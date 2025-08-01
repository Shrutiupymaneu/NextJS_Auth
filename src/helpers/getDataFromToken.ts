import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) return null;

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    return typeof decodedToken === "object" && "_id" in decodedToken
      ? decodedToken._id as string
      : null;

  } catch {
    return null;
  }
};
