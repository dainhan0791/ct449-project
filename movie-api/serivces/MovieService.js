import Movie from "../models/MovieModel.js";
const createMovie = async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";
    let sort = req.query.sort || "desc";
    let genre = req.query.genre || "all";
    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];
    genre === "all"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort({
        rating: sort,
      })
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const getMovie = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      await movie.updateOne({
        $set: req.body,
      });
      res.status(200).json(`Update Movie with title: ${id} successfully`);
    } else {
      res.status(403).json(`Movie with id: ${id} is not exist`);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      await movie.deleteOne();
      res.status(200).json({
        movie: movie,
        message: "Delete Movie with id: ${id} successfully",
      });
    } else {
      res.status(403).json(`Movie with id: ${id} is not exist`);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { createMovie, getMovies, getMovie, updateMovie, deleteMovie };
