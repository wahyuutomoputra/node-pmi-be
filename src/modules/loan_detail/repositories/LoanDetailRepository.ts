import { Knex } from "knex";
import { ILoanDetail,addLoanDetail } from "../types";

export class LoanDetailRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "loan_details";
  }

  public async create(data: addLoanDetail) {
    return await this.knex(this.table).insert(data);
  }

  public async insertBatch(id_peminjaman : number, id_asset: number[]){
    let data : any[] = []

    id_asset.forEach(x => { 
        data.push({
            id_asset: x,
            id_peminjaman,
        })
    })

    return await this.knex(this.table).insert(data)

  }

//   public async get(): Promise<IGroup[]> {
//     return await this.knex<IGroup>(this.table);
//   }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
