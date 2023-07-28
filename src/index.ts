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
import { verifyToken } from "./middleware/AuthMiddleware";
import { IEmployee } from "./modules/employee/types";

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
const knexInstance = database.getKnexInstance();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/users", UserRoutes(knexInstance));
app.use("/api/roles", RoleRoutes(knexInstance));
app.use("/api/groups", GroupRoutes(knexInstance));
app.use("/api/divisions", DivisionRoutes(knexInstance));
app.use("/api/types", TypeRoutes(knexInstance));
app.use("/api/instances", InstanceRoutes(knexInstance));
app.use("/api/employees", EmployeeRoutes(knexInstance));
app.use("/api/borrowers", BorrowerRoutes(knexInstance));
app.use("/api/assets", AssetRoutes(knexInstance));
app.use("/api/auth", AuthRoutes(knexInstance));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
