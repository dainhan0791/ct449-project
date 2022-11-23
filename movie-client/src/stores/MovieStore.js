import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => {
    return {
      name: "",
      videoEmbed: "",
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
  },
});
