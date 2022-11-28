<template lang="">
  <div class="favorite-page container">
    <Header />
    <p class="text-center fs-2 font-monospace">List Favorite Movie</p>
    <div className="d-flex flex-wrap justify-content-start">
      <div v-if="movies.length > 0" v-for="movie in movies" :key="movie.id" class="p-1">
        <Card
          :movie="movie"
          :add="false"
          :setDataFromChild="setDataFromChild"
        />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Card from "../components/Card.vue";
import axios from "axios";

export default {
  data() {
    return {
      movies: [],
      VUE_APP_API_MOVIES: import.meta.env.VITE_APP_API_MOVIES,
    };
  },
  components: {
    Header,
    Card,
  },
  methods: {
    setDataFromChild(movieID) {
      this.movies = this.movies.filter((element) => element._id !== movieID);
    },
    getMovies() {
      let moviesId = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];

      for (let i = 0; i <= moviesId.length; i++) {
        axios
          .get(`${this.VUE_APP_API_MOVIES}${moviesId[i]}`)
          .then((result) => this.movies.push(result.data));
      }
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>
