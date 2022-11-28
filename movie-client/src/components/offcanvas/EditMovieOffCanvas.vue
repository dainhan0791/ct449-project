<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRightEditMovie"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Edit Movie</h5>
      <button type="button" @click="setCurrentMovie" class="btn btn-success">
        Get Current Movie
      </button>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        @click="setEmptyCurrentMovie"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form>
        <div class="mb-3">
          <label for="movie-img" class="form-label">img</label>
          <input
            type="text"
            class="form-control"
            id="movie-img"
            v-model.trim="img"
          />
        </div>
        <div class="mb-3">
          <label for="movie-name" class="form-label">name</label>
          <input
            type="text"
            class="form-control"
            id="movie-name"
            v-model.trim="name"
          />
        </div>
        <div class="mb-3">
          <label for="movie-releaseDate" class="form-label">releaseDate</label>
          <input
            type="text"
            class="form-control"
            id="movie-releaseDate"
            v-model.trim="releaseDate"
          />
        </div>
        <div class="mb-3">
          <label for="movie-rating" class="form-label">rating</label>
          <input
            type="text"
            class="form-control"
            id="movie-rating"
            v-model.trim="rating"
          />
        </div>
        <div class="mb-3">
          <label for="movie-genre" class="form-label">genre</label>
          <input
            type="text"
            class="form-control"
            id="movie-genre"
            v-model.trim="genre"
          />
        </div>
        <div class="mb-3">
          <label for="movie-desc" class="form-label">desc</label>
          <input
            type="text"
            class="form-control"
            id="movie-desc"
            v-model.trim="desc"
          />
        </div>
        <div class="mb-3">
          <label for="movie-videoEmbed" class="form-label">videoEmbed</label>
          <input
            type="text"
            class="form-control"
            id="movie-videoEmbed"
            v-model.trim="videoEmbed"
          />
        </div>

        <button
          type="button"
          @click="editMovie"
          class="btn btn-primary"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>
<script >
import { useMovieStore } from "../../stores/MovieStore";

export default {
  data() {
    return {
      movieStore: useMovieStore(),
      img: "",
      name: "",
      releaseDate: "",
      rating: "",
      genre: [],
      desc: "",
      videoEmbed: "",
    };
  },
  methods: {
    setCurrentMovie() {
      if (this.movieStore.currentMovieToEdit) {
        this.img = this.movieStore.currentMovieToEdit.img;
        this.name = this.movieStore.currentMovieToEdit.name;
        this.releaseDate = this.movieStore.currentMovieToEdit.releaseDate;
        this.rating = this.movieStore.currentMovieToEdit.rating;
        this.genre = this.movieStore.currentMovieToEdit.genre;
        this.desc = this.movieStore.currentMovieToEdit.desc;
        this.videoEmbed = this.movieStore.currentMovieToEdit.videoEmbed;
      } else {
        this.img = "";
        this.name = "";
        this.releaseDate = "";
        this.rating = "";
        this.genre = "";
        this.desc = "";
        this.videoEmbed = "";
      }
    },
    setEmptyCurrentMovie() {
      this.img = "";
      this.name = "";
      this.releaseDate = "";
      this.rating = "";
      this.genre = [];
      this.desc = "";
      this.videoEmbed = "";
    },
    editMovie() {
      if (
        this.img &&
        this.name &&
        this.releaseDate &&
        this.rating &&
        this.genre &&
        this.desc &&
        this.videoEmbed
      ) {
        this.movieStore.editMovie({
          img: this.img,
          name: this.name,
          releaseDate: this.releaseDate,
          rating: this.rating,
          genre: this.genre,
          desc: this.desc,
          videoEmbed: this.videoEmbed,
        });
      }else{
        this.movieStore.toaster.error("Please enter your input to update the movie")
      }
    },
  },
};
</script>
