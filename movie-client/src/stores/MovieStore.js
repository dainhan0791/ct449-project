import { defineStore } from "pinia";
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

export const useMovieStore = defineStore("movie", {
  state: () => {
    return {
      name: "",
      videoEmbed: "",
      movies: [],
      total: "",
      currentMovieToEdit: {},
      VUE_APP_API_MOVIES: import.meta.env.VITE_APP_API_MOVIES,
      toaster: createToaster({
        position: "top-right",
        dismissible: false,
      }),
    };
  },

  actions: {
    setCurrentMovie(name, videoEmbed) {
      if (name) {
        this.name = name;
      } else {
        this.name = "";
      }
      if (videoEmbed) {
        this.videoEmbed = videoEmbed;
      } else {
        this.videoEmbed = "";
      }
    },

    async getMovies(total) {
      this.total = total;
      let result = await axios.get(`${this.VUE_APP_API_MOVIES}?limit=${total}`);
      this.movies = result.data.movies;
    },
    async deleteMovie(id) {
      try {
        await axios.delete(`${this.VUE_APP_API_MOVIES}${id}`);
        this.getMovies(this.total - 1);
        this.toaster.success(`Delete Movie ${id} Successfully`);
      } catch (error) {
        this.toaster.info(`Delete Movie ${id} Failed` + error.message);
      }
    },
    async setCurrentMovieToEdit(movie) {
      this.currentMovieToEdit = movie;
    },
    async editMovie(data) {
      try {
        await axios.put(
          `${this.VUE_APP_API_MOVIES}${this.currentMovieToEdit._id}`,
          data
        );
        this.getMovies(this.total);
        this.toaster.success(
          `Edit Movie ${this.currentMovieToEdit.name} Successfully`
        );
      } catch (error) {
        this.toaster.error(
          `Edit Movie ${this.currentMovieToEdit.name} Failed` + error.message
        );
      }
    },
    async addMovie(data) {
      try {
        await axios.post(this.VUE_APP_API_MOVIES, data);
        this.getMovies(this.total + 1);

        this.toaster.success(`Add Movie ${data.name} Successfully`);
      } catch (error) {
        this.toaster.error(
          `Add Movie ${this.currentMovieToEdit.name} Failed` + error.message
        );
      }
    },
  },
});
