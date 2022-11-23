// Global Import
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// Local Import
import DbConnect from "./DbConnect.js";
import MovieRoute from "./routes/MovieRoute.js";
import UserRoute from "./routes/UserRoute.js";
import UploadProfileImageRoute from "./routes/UploadProfileImageRoute.js";

const app = express();
dotenv.config();
// To Server Images For Public
app.use(express.static("public"));
app.use("/images", express.static("images"));
// Middleware
app.use(bodyParser.json({ limit: "30mb", extends: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const port = process.env.PORT;
DbConnect();
app.listen(port, () => console.log(`Api working on port ${port}`));
app.use("/api", MovieRoute);
app.use("/users", UserRoute);
app.use("/upload", UploadProfileImageRoute);
