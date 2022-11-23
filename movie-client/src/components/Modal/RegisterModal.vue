<template>
  <!-- Modal -->
  <div
    class="modal fade"
    tabindex="-1"
    id="RegisterModal"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form class="modal-dialog" method="post" enctype="multipart/form-data">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Register User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form method="post" enctype="multipart/form-data"></form>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="inputUsername" class="col-sm-2 col-form-label"
              >Username</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputUsername"
                v-model.trim="username"
                required
              />
              <div class="invalid-feedback">
                Example invalid form file feedback
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label"
              >Password</label
            >
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                v-model.trim="password"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputFirstname" class="col-sm-2 col-form-label"
              >Firstname</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputFirstname"
                v-model.trim="firstname"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputLastname" class="col-sm-2 col-form-label"
              >Lastname</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputLastname"
                v-model.trim="lastname"
              />
            </div>
          </div>

          <div class="mb-3 row">
            <label for="formFile" class="col-sm-2 col-form-label"
              >ProfileImage</label
            >
            <div class="col-sm-10">
              <input
                class="form-control"
                type="file"
                id="formFile"
                name="profileImage"
                @change="onFileChange"
              />
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
          <div v-if="this.image">
            <button
              type="submit"
              class="btn btn-primary"
              @click="registerUser"
              data-bs-dismiss="modal"
            >
              Register
            </button>
          </div>
          <div v-else>
            <button type="submit" class="btn btn-secondary" disabled>
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useUserStore } from "../../stores/UserStore";
export default {
  data() {
    return {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      profileImage: "",
      image: "",
      VITE_APP_API_USERS: import.meta.env.VITE_APP_API_USERS,
      VITE_APP_UPLOAD_PROFILE_IMAGES: import.meta.env
        .VITE_APP_UPLOAD_PROFILE_IMAGES,
      userStore: useUserStore(),
    };
  },
  methods: {
    async registerUser(e) {
      e.preventDefault();

      if (this.image) {
        const formData = new FormData();
        const fileName = Date.now() + this.image.name;
        this.profileImage = fileName;
        formData.append("name", this.profileImage);
        formData.append("file", this.image);
        try {
          this.userStore.uploadProfileImage(
            this.VITE_APP_UPLOAD_PROFILE_IMAGES,
            formData
          );
        } catch (error) {
          console.log(error.message);
        }
      }
      await this.userStore.registerUser(this.VITE_APP_API_USERS, {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        profileImage: this.profileImage,
      });
    },
    onFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        if ((e.target.name = "profileImage")) {
          this.image = img;
        }
      }
    },
  },
};
</script>
