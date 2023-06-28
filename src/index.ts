// src/app.ts

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Database from "./database/Database";
import UserRoutes from "./routes/UserRoutes";
import RoleRoutes from "./routes/RoleRoutes";
import GroupRoutes from "./routes/GroupRoutes"

const app = express();

// Initialize database connection
const database = Database.getInstance();
const knexInstance = database.getKnexInstance();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", UserRoutes(knexInstance));
app.use("/api/roles", RoleRoutes(knexInstance));
app.use("/api/groups", GroupRoutes(knexInstance));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
