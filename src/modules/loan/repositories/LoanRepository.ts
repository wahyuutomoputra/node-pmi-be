import { Knex } from "knex";
import { ILoan, addLoan } from "../types";

export class LoanRepository {
    private knex: Knex;
    private table: string;

    constructor(knex: Knex) {
        this.knex = knex;
        this.table = "loans";
    }

    public async create(data: addLoan): Promise<number> {
        const id: number = await this.knex(this.table).insert(data).returning('id_peminjaman');
        return id
    }

    public async get(): Promise<ILoan[]> {
        return await this.knex<ILoan>(this.table);
    }

    // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
