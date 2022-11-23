<template>
  <!-- Modal -->
  <div
    class="modal fade w-100 movie-modal"
    id="MovieModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <h3>{{ movieStore.name }}</h3>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="movieStore.setCurrentMovie"
          ></button>
        </div>
        <div class="modal-body">
          <YouTube
            :src="movieStore.videoEmbed"
            @ready="onReady"
            ref="youtube"
            class="youtube"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="movieStore.setCurrentMovie"
          >
            Close
          </button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import YouTube from "vue3-youtube";
import { useMovieStore } from "../../stores/MovieStore";
export default {
  components: {
    YouTube,
  },
  data() {
    return {
      movieStore: useMovieStore()
    }
  },
  methods: {
    onReady() {
      this.$refs.youtube.playVideo();
    },
    
  },
};
</script>
