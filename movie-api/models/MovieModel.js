import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  img: { type: String, required: true },
  name: {
    type: String,
    require: true,
  },
  releaseDate: {
    type: String,
    require: true,
  },
  rating: { type: Number, required: true },
  genre: { type: [String], required: true },
  desc: {
    type: String,
    required: true,
  },
  videoEmbed: { type: String, required: true },
});

const Movie = mongoose.model("movies", MovieSchema);

export default Movie;
