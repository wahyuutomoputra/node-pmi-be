import { Request, Response } from "express";
import { AssetService } from "../services/AssetService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addAssetReq, paginateAssets } from "../request";

export class AssetController {
  private assetService: AssetService;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
  }

  public createAsset = async (req: Request, res: Response) => {
    const input = plainToClass(addAssetReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.assetService.create({
        harga_perolehan: input.harga_perolehan,
        id_divisi: input.id_divisi,
        id_jenis: input.id_jenis,
        masa_manfaat: input.masa_manfaat,
        nama_asset: input.name,
        status: 'tersedia',
        tarif: input.tarif,
        tgl_masuk: input.tgl_masuk,
        asset_code: input.asset_code
      });
    } catch (error) {
      console.log(error)
      responseError({ res });
      return;
    }

    responseOk({ res });
  };

  public getAsset = async (req: Request, res: Response) => {
    let data = await this.assetService.get();
    responseOk({ res, data });
  };

  public getPaginatedAssets = async (req: Request, res: Response) => {
    const input = plainToClass(paginateAssets, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    input.searchTerm = input.searchTerm ?? "";

    try {
      let data = await this.assetService.getPaginatedAssets(
        input.page,
        input.searchTerm
      );
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
