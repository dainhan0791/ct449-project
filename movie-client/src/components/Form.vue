<template>
  <div class="form-component">
    <div class="form-container">
      <form class="row search-movies">
        <input
          class="col-10"
          type="text"
          placeholder="Search"
          id="search-input"
          @input="search = $event.target.value"
        />
        <button
          type="button"
          value="search"
          class="col-2 toggle-movie-button-search"
          data-bs-toggle="modal"
          data-bs-target="#MovieModal"
          @click="handleSearchMovie"
          v-if="this.search && this.movies.length > 0"

        >
       
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button
          type="button"
          value="search"
          class="col-2 toggle-movie-button-search"
          @click="handleSearchMovie"
          v-if="!(this.search && this.movies.length > 0)"

        >
       
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <div class="btn-sort-container">
        <div class="btn-sort" id="goodToBad" @click="setSortGoodBad">
          Top
          <span>&#8594;</span>
        </div>
        <div class="btn-sort" id="badToGood" @click="setSortGoodBad">
          Flop<span>&#8594;</span>
        </div>
      </div>
      <div></div>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic checkbox toggle button group"
        v-for="genre in genres"
        :key="genre"
      >
        
        <input
          type="checkbox"
          class="btn-check"
          :id="genre"
          autocomplete="off"
          @click="setGenre(genre, index)"
        />
        <label class="btn btn-checkbox" :for="genre">{{ genre }}</label>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="movie in movies" :key="movie.id" class="p-1" style="margin: 0 auto">
        <Card :movie="movie" :genres="genres" :add="true" class="col-3" />
      </div>
    </div>

    <div class="pagination justify-content-center p-2">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li
            :class="
              disabledPreviousPage() ? ['disabled', 'page-item'] : 'page-item'
            "
          >
            <a
              class="page-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              @click="previousPage()"
              >Previous</a
            >
          </li>

          <li
            class="page-item"
            v-for="index in totalPage(this.total, this.limit)"
            :key="index"
            @click="setPage(index)"
            @change="activeItem(index)"
          >
            <a class="page-link" href="#">{{ index }}</a>
          </li>

          <li
            :class="disabledNextPage ? ['disabled', 'page-item'] : 'page-item'"
          >
            <a class="page-link" href="#" @click="nextPage()">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./Card.vue";
import { useMovieStore } from "../stores/MovieStore";
import { createToaster } from "@meforma/vue-toaster";

export default {
  components: {
    Card,
  },
  data() {
    return {
      movies: [],
      genres: [],
      search: "",
      total: Number || 8,
      limit: Number || 8,
      page: Number || 1,
      sort: "desc",
      genre: [] || "all",
      VUE_APP_API_MOVIES: import.meta.env.VITE_APP_API_MOVIES,
      VUE_APP_API_USERS: import.meta.env.VUE_APP_API_USERS,
      movieStore: useMovieStore(),
      toaster: createToaster({
        position: "top-right",
        dismissible: false,
      }),
    };
  },
  methods: {
    getMovies() {
      axios
        .get(
          `${this.VUE_APP_API_MOVIES}?page=${this.page}&sort=${
            this.sort
          }&genre=${this.genre.toString()}&search=${this.search}`
        )
        .then((result) => {
          this.movies = result.data.movies;
          this.page = result.data.page;
          this.total = result.data.total;
          this.limit = result.data.limit;
          this.movieStore.getMovies(this.total)
        });

      axios
        .get(this.VUE_APP_API_MOVIES)
        .then((result) => (this.genres = result.data.genres));
    },

    setSortGoodBad(e) {
      if (e.target.id === "goodToBad") {
        this.sort = "desc";
      } else if (e.target.id === "badToGood") {
        this.sort = "asc";
      } else {
        return "";
      }
      this.getMovies();
    },
    setGenre(genre) {
      if (this.genre.includes(genre)) {
        let filter = this.genre.filter((item) => item !== genre);
        this.genre = filter;
      } else {
        this.genre.push(genre);
      }
      this.getMovies();
    },
    totalPage(total, limit) {
      let totalPage = Math.ceil(total / limit);
      return totalPage || 1;
    },
    setPage(page) {
      this.page = page;
      this.getMovies();
    },
    previousPage() {
      this.page--;
      this.getMovies();
    },
    nextPage() {
      this.page++;
      this.getMovies();
    },
    disabledPreviousPage() {
      if (this.page <= 1) {
        return true;
      } else {
        return false;
      }
    },
    disabledNextPage() {
      if (this.page >= totalPage(this.total, this.limit)) {
        return true;
      } else {
        return false;
      }
    },
   
    handleSearchMovie() {
      if (this.search) {
        if (this.movies.length > 0) {
          this.movieStore.setCurrentMovie(
            this.movies[0].name,
            this.movies[0].videoEmbed
          );
        } else {
          this.toaster.error(`Can not find movie: ${this.search}`);
        }
      } else {
        this.toaster.error(`Please enter your name movie`);
      }
    },
  },
  beforeMount() {
    this.getMovies();
  },

  watch: {
    search() {
      this.getMovies();
    },
  },
};
</script>
