<template>
  <div class="cellphone-container">
    <img :src="movie.img" alt="" class="movie-img" />
    <div class="card-context d-flex flex-column justify-content-end">

      <div class="m-0 p-0 text-center">
        <h3 class="fs-5">{{ movie.name }}</h3>
      </div>
      <p v-if="movie.releaseDate" class="text-center">
        Release Date {{ movie.releaseDate }}
      </p>
      <p v-else>date inconnue</p>
      <p class="text-center">
        {{ movie.rating }}/10
        <span>
          <i class="fa-solid fa-star"></i>
        </span>
      </p>
      <ul class="movie-gen d-flex justify-content-center">
        <li v-for="item in movie.genre" :key="item" class="bg-white p-1">
          {{ item }}
        </li>
      </ul>
      <div class="movie-description">
        <h3 v-if="movie.desc">Description</h3>
        <p class="fs-5 card-desc text-break">{{ movie.desc }}</p>
      </div>
      <div class="d-flex w-100 justify-content-center">
        <button
          class="btn btn-light watch-btn"
          data-bs-toggle="modal"
          data-bs-target="#MovieModal"
          @click="setCurrentMovie(movie.name, movie.videoEmbed)"
        >
          Watch
        </button>

        <button
          v-if="add"
          @Click="addStorage(movie)"
          class="btn btn-light action-btn"
        >
          Add to Favorite
        </button>
        <div
          v-else
          @Click="removeStorage(movie)"
          class="btn btn-light action-btn"
        >
          Remove to Favorite
        </div>
      </div>
    </div>

    <MovieModal />
  </div>
</template>

<script>
import MovieModal from "./Modal/MovieModal.vue";
import YouTube from "vue3-youtube";
import { useMovieStore } from "../stores/MovieStore";
import { createToaster } from "@meforma/vue-toaster";

export default {
  components: {
    MovieModal,
    YouTube,
  },
  data() {
    return {
      movieStore: useMovieStore(),
      toaster: createToaster({
        position: "top-right",
        dismissible: false,
      }),
    };
  },
  props: {
    movie: Object,
    genres: Object,
    add: Boolean,
    setDataFromChild: Function,
  },
  methods: {
   
    addStorage(movie) {
      let storeData = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];
      if (!storeData.includes(movie._id.toString())) {
        storeData.push(movie._id);
        window.localStorage.movies = storeData;
        this.toaster.success(`Add ${movie.name} To Favorite Successfully`);
      } else {
        this.toaster.warning(`${movie.name} Already Exist In Your Favorite`);
      }
    },
    removeStorage(movie) {
      let storeData = window.localStorage.movies.split(",");

      let indexMovie = storeData.indexOf(movie._id.toString());
      if (indexMovie != -1) {
        let movie = this.movie;
        storeData.splice(indexMovie, 1);
        this.setDataFromChild(movie._id);
        window.localStorage.movies = storeData;
        this.toaster.info(`Remove ${movie.name} From Favorite Successfully`);
      }
    },
    setCurrentMovie(name, videoEmbed) {
      this.movieStore.setCurrentMovie(name, videoEmbed);
    },
  },
};
</script>
