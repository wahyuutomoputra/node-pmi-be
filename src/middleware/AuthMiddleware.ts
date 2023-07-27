// utils/jwt.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { responseCode } from "../helper/Response";
import { IEmployee } from "../modules/employee/types";

const secretKeyJwt = "pmi-banyumas"; // Ganti dengan kunci rahasia Anda yang kuat

// Fungsi untuk membuat token
export function createToken(data: IEmployee): string {
  delete data.password;
  return jwt.sign(data, secretKeyJwt, { expiresIn: "24h" }); // Token akan berlaku selama 1 jam
}

// Middleware untuk memverifikasi token
export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.header("Authorization");

  if (!token) {
    responseCode({ res, code: 401, message: "Token not provided" });
    return;
  }

  jwt.verify(token, secretKeyJwt, (err, decoded) => {
    if (err) {
      responseCode({ res, code: 403, message: "Invalid token" });
      return;
    }
    next();
  });
}

export function decodeToken(token: string): IEmployee | null {
  try {
    const decoded = jwt.decode(token) as IEmployee;
    return decoded;
  } catch (error) {
    // Tidak dapat mendekode token, kembalikan null atau tangani kesalahan sesuai kebutuhan Anda
    return null;
  }
}
