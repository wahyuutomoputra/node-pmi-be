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
  router.get("/", assetController.getAsset);
  router.get("/paginate", assetController.getPaginatedAssets)
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
