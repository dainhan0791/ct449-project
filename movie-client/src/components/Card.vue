<template>
  <div class="cellphone-container">
    <img :src="movie.img" alt="" class="movie-img" />
    <div class="fs-4 m-0 p-0">
      <h3>{{ movie.name }}</h3>
    </div>
    <p v-if="movie.releaseDate">
      Release Date {{ dateFormat(movie.releaseDate) }}
    </p>
    <p v-else>date inconnue</p>
    <p>
      {{ movie.rating }}/10
      <span>
        <i class="fa-solid fa-star"></i>
      </span>
    </p>
    <ul class="movie-gen">
      <li v-for="item in movie.genre" :key="item" class="bg-white p-1">
        {{ item }}
      </li>
    </ul>
    <div class="movie-description">
      <h3 v-if="movie.desc">Description</h3>
      <p>{{ movie.desc }}</p>
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
    <MovieModal />
  </div>
</template>

<script>
import MovieModal from "./Modal/MovieModal.vue";
import YouTube from "vue3-youtube";
import {useMovieStore} from '../stores/MovieStore'

export default {
  components: {
    MovieModal,
    YouTube,
  },
  data() {
    return {
      movieStore : useMovieStore(),
    }
  },
  props: {
    movie: Object,
    genres: Object,
    add: Boolean,
    setDataFromChild: Function,
  },
  methods: {
    dateFormat(date) {
      let array = date.split("");
      let stringToArray = array.reverse();
      let dateFormat = stringToArray.join("");
      return dateFormat;
    },

    addStorage(movie) {
      let storeData = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];
      if (!storeData.includes(movie._id.toString())) {
        storeData.push(movie._id);
        window.localStorage.movies = storeData;
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
      }
    },
    setCurrentMovie(name, videoEmbed){
      this.movieStore.setCurrentMovie(name, videoEmbed)
    }
  },
};
</script>
