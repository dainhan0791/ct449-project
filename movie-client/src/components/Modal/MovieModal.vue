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
      <div class="modal-content " >
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <h3>{{ movieStore.name }}</h3>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="setCurrentMovie"
          ></button>
        </div>
        <div class="modal-body">
          <YouTube
            :src="movieStore.videoEmbed"
            ref="youtube"
            class="youtube"
            style="max-width: 640px"
            
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="setCurrentMovie"
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
import {createToaster} from '@meforma/vue-toaster';

export default {
  components: {
    YouTube,
  },
  data() {
    return {
      movieStore: useMovieStore(),
      toaster: createToaster({
        position: "top-right",
        dismissible: false,
      }),
    }
  },
  methods: {
    setCurrentMovie(){
      this.toaster.info(`Pause Movie ${this.movieStore.name}`)
      this.movieStore.setCurrentMovie()
    }
  }

};
</script>
