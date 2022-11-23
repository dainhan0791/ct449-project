<template>
  <div class="form-component">
    <div class="form-container">
      <form class="d-flex">
        <input
          type="text"
          placeholder="Search"
          id="search-input"
          @input="search = $event.target.value"
        />
        <input type="submit" value="search" />
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
    </div>
    <div class="result">
      <div v-for="movie in movies" :key="movie.id" class="p-2">
        <Card :movie="movie" :genres="genres" :add="true" />
      </div>
    </div>
  
    <div class="pagination justify-content-center p-2">
      <nav aria-label="Page navigation example">
        <ul class="pagination  justify-content-center ">
          <li 
            :class="disabledPreviousPage() ? ['disabled', 'page-item'] : 'page-item'"
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
           :class=" disabledNextPage ? ['disabled', 'page-item'] : 'page-item'"
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
      sort: 'desc',
      genre: [] || 'all',
      VUE_APP_API_MOVIES: import.meta.env.VITE_APP_API_MOVIES,
      VUE_APP_API_USERS: import.meta.env.VUE_APP_API_USERS,

    };
  },
  methods: {
    getMovies() {
      axios
        .get(
          `${this.VUE_APP_API_MOVIES}?page=${this.page}&sort=${this.sort}&genre=${this.genre.toString()}&search=${this.search}`
        )
        .then((result) => {
          this.movies = result.data.movies;
          this.page = result.data.page;
          this.total = result.data.total;
          this.limit = result.data.limit;
        });

      axios
        .get(this.VUE_APP_API_MOVIES)
        .then((result) => (this.genres = result.data.genres));
    },
    
    setSortGoodBad(e) {
        if (e.target.id === "goodToBad") {
         this.sort = 'desc'
        } else if (e.target.id === "badToGood") {
          this.sort = 'asc'
        } else {
          return "";
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
    disabledPreviousPage(){
      if(this.page <= 1) {
        return true;
      }else{
        return false;
      }
    },
    disabledNextPage(){
      if(this.page >= totalPage(this.total, this.limit)){
        return true;
      }else{
        return false;
      }
    }

   
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
