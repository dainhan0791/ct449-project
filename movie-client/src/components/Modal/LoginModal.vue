<template >
  <!-- Modal -->
  <div
    class="modal fade"
    tabindex="-1"
    id="LoginModal"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form class="modal-dialog" method="post" enctype="multipart/form-data">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Login User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label for="inputUsername" class="col-sm-2 col-form-label"
                >Username</label
              >
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputUsername" v-model.trim="username" />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label"
                >Password</label
              >
              <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword"  v-model.trim="password" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="loginUser" data-bs-dismiss="modal">Login</button>
          </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useUserStore } from '../../stores/UserStore';
export default {
  data() {
    return {
      username: '',
      password: '',
      VITE_APP_API_USERS: import.meta.env.VITE_APP_API_USERS,
      userStore: useUserStore()
    }
  },
  methods: {
   async loginUser()  {
    await this.userStore.loginUser(this.VITE_APP_API_USERS, {username: this.username, password: this.password})
   }
  },
};
</script>
