// src/modules/user/services/UserService.ts

import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userData: any) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.userRepository.createUser(userData);
  }

  // Membuat hash password
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Banyaknya iterasi hashing
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error("Gagal membuat hash password");
    }
  }

  public async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw new Error("Gagal memvalidasi password");
    }
  }

  public async getById(id: number){

  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
