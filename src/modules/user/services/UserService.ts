// src/modules/user/services/UserService.ts

import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userData: any) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.userRepository.createUser(userData);
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
