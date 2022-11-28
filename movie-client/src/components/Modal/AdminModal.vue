<template>
  <!-- Modal -->
  <div
    class="modal login-modal fade"
    tabindex="-1"
    id="AdminModal"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-fullscreen"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="modal-content">
        <div class="modal-header admin-modal-header">
          <button type="button" class="btn btn-secondary my-0-auto">
            Admin Dashborad 
          </button>
          <button type="button" class="btn btn-info mx-2">
            Notifications <span class="badge bg-danger">{{movieStore.total}}</span>
          </button>
          <button
            type="button"
            class="btn btn-success mx-auto"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRightAddMovie"
            aria-controls="offcanvasRight"
          >
            <i class="fa-solid fa-plus"></i>
            <span class="text-"> Add Movie</span>
          </button>
          <AddMovieOffCanvas />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">_id</th>
                  <th scope="col">img</th>
                  <th scope="col">name</th>
                  <th scope="col">releaseDate</th>
                  <th scope="col">genre</th>
                  <th scope="col">desc</th>
                  <th scope="col">videoEmbed</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody v-for="movie in movieStore.movies" :key="movie._id">
                <tr>
                  <td>{{ movie._id }}</td>
                  <td>
                    <img
                      :src="movie.img"
                      class="mx-auto d-block admin-table-img rounded"
                      alt="movie.name"
                    />
                  </td>
                  <td>{{ movie.name }}</td>
                  <td>{{ movie.releaseDate }}</td>
                  <td>{{ movie.genre }}</td>
                  <td>{{ movie.desc }}</td>
                  <td>{{ movie.videoEmbed }}</td>
                  <td>
                    <a
                      href="#"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRightEditMovie"
                      aria-controls="offcanvasRight"
                      @click="setCurrentMovieToEdit(movie)"
                    >
                      <i class="fa-solid fa-pen text-primary"></i>
                    </a>
                    <EditMovieOffCanvas />
                  </td>
                  <td @click="movieStore.deleteMovie(movie._id)">
                    <a href="#">
                      <i class="fa-solid fa-trash text-danger"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useMovieStore } from "../../stores/MovieStore";
import EditMovieOffCanvas from "../offcanvas/EditMovieOffCanvas.vue";
import AddMovieOffCanvas from "../offcanvas/AddMovieOffCanvas.vue";

export default {
  components: {
    EditMovieOffCanvas,
    AddMovieOffCanvas
  },
  data() {
    return {
      movieStore: useMovieStore(),
      currentMovie: {},
    };
  },
  methods: {
    async setCurrentMovieToEdit(movie) {
      await this.movieStore.setCurrentMovieToEdit(movie);
    },
  },
};
</script>
