// src/app.ts

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import Database from "./database/Database";

import UserRoutes from "./routes/UserRoutes";
import RoleRoutes from "./routes/RoleRoutes";
import GroupRoutes from "./routes/GroupRoutes";
import DivisionRoutes from "./routes/DivisionRoutes";
import TypeRoutes from "./routes/TypeRoutes";
import InstanceRoutes from "./routes/InstanceRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import BorrowerRoutes from "./routes/BorrowerRoutes";
import AssetRoutes from "./routes/AssetRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import LoanRoutes from "./routes/LoanRoutes";
import { verifyToken } from "./middleware/AuthMiddleware";
import { IEmployee } from "./modules/employee/types";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: IEmployee;
    }
  }
}

// Initialize database connection
const database = Database.getInstance();
let knexInstance = database.getKnexInstance();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const v1Router = express.Router();

// Routes with "v1" prefix
v1Router.use("/users", UserRoutes(knexInstance));
v1Router.use("/roles", RoleRoutes(knexInstance));
v1Router.use("/groups", GroupRoutes(knexInstance));
v1Router.use("/divisions", DivisionRoutes(knexInstance));
v1Router.use("/types", TypeRoutes(knexInstance));
v1Router.use("/instances", InstanceRoutes(knexInstance));
v1Router.use("/employees", EmployeeRoutes(knexInstance));
v1Router.use("/borrowers", BorrowerRoutes(knexInstance));
v1Router.use("/assets", AssetRoutes(knexInstance));
v1Router.use("/loans", LoanRoutes(knexInstance));

app.use("/api/v1/auth", AuthRoutes(knexInstance));

// Mount the v1Router under "/api" prefix
app.use("/api/v1", v1Router);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
