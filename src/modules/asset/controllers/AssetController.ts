import { Request, Response } from "express";
import { AssetService } from "../services/AssetService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  addAssetReq,
  getByIdReq,
  paginateAssets,
  updateAssetReq,
} from "../request";

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
        status: "tersedia",
        tarif: input.tarif,
        tgl_masuk: input.tgl_masuk,
        asset_code: input.asset_code,
      });
    } catch (error) {
      console.log(error);
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

    input.search = input.search ?? "";
    input.status = input.status ?? "";

    try {
      let data = await this.assetService.getPaginatedAssets({
        pageNumber: input.page,
        searchTerm: input.search,
        status: input.status,
      });
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  public dashboard = async (req: Request, res: Response) => {
    try {
      let data = await this.assetService.dashboard();
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  public harga_asset = async (req: Request, res: Response) => {
    try {
      let data = await this.assetService.harga_asset();
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  public penyusutan = async (req: Request, res: Response) => {
    try {
      let data = await this.assetService.penyusutan();
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  public updateAsset = async (req: Request, res: Response) => {
    const input = plainToClass(updateAssetReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.assetService.update(
        {
          harga_perolehan: input.harga_perolehan,
          id_divisi: input.id_divisi,
          id_jenis: input.id_jenis,
          masa_manfaat: input.masa_manfaat,
          nama_asset: input.name,
          status: input.status,
          tarif: input.tarif,
          tgl_masuk: input.tgl_masuk,
          asset_code: input.asset_code,
        },
        input.id_asset
      );
    } catch (error) {
      console.log(error);
      responseError({ res });
      return;
    }

    responseOk({ res });
  };

  public getById = async (req: Request, res: Response) => {
    const input = plainToClass(getByIdReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      const data = await this.assetService.getById(input.id_asset);
      responseOk({ res, data });
    } catch (error) {
      console.log(error);
      responseError({ res, message: error });
      return;
    }
  };
}
