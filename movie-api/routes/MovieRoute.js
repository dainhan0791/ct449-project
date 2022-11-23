import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../serivces/MovieService.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovie);
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
