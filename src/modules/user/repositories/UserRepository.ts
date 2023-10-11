// src/modules/user/repositories/UserRepository.ts

import { Knex } from "knex";

export class UserRepository {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public async createUser(userData: any) {
    const [userId] = await this.knex("users").insert(userData);
    return userId;
  }
  

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
