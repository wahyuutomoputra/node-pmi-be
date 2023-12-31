import { Router } from "express";
import { AssetController } from "../modules/asset/controllers/AssetController";
import { AssetRepository } from "../modules/asset/repositories/AssetRepository";
import { AssetService } from "../modules/asset/services/AssetService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const assetRepository = new AssetRepository(knexInstance);
  const assetService = new AssetService(assetRepository);
  const assetController = new AssetController(assetService);

  router.post("/", assetController.createAsset);
  router.post("/update", assetController.updateAsset);
  router.get("/", assetController.getAsset);
  router.get("/paginate", assetController.getPaginatedAssets)
  router.get("/dashboard", assetController.dashboard)
  router.get("/harga", assetController.harga_asset)
  router.get("/penyusutan", assetController.penyusutan)
  router.get("/detail", assetController.getById)

  return router;
}
