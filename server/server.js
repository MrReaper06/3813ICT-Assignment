import express from "express";
import http from "node:http";
import cors from "cors";
import { authRoutes } from "./routes/auth.js";
import { registerRoutes } from "./routes/register.js";
import { groupRoutes } from "./routes/groups.js";

const APP = express();
const httpServer = http.createServer(APP);

APP.use(cors());
APP.use(express.json());

authRoutes(APP);
registerRoutes(APP);
groupRoutes(APP);

httpServer.listen(3000, () => {
    console.log("The server has started.")
})