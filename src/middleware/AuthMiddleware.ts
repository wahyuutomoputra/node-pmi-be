// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Mengambil token dari header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // Verifikasi token
    const decodedToken = jwt.verify(token, "your-secret-key") as {
      userId: string;
    };


    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
