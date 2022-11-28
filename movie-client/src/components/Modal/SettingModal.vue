<template>
  <div
    id="SettingModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ this.handleTitleModal() }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetSetting"
          ></button>
        </div>
        <form method="put" enctype="multipart/form-data">
          <div class="modal-body" v-if="isSettingName">
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
                >LastName</label
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
          </div>
          <div class="modal-body" v-if="isSettingProfileImage">
            <div v-if="isSettingProfileImage">
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
                    accept=".jpg, .jpeg, .png, .svg, .gif"

                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body" v-if="isSettingPassword">
            <div v-if="isSettingPassword">
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-3 col-form-label"
                  >Password</label
                >
                <div class="col-sm-9">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                    v-model.trim="password"
                  />
                </div>
              </div>
            </div>
            <div v-if="isSettingPassword">
              <div class="mb-3 row">
                <label for="inputNewPassword" class="col-sm-3 col-form-label"
                  >New Password</label
                >
                <div class="col-sm-9">
                  <input
                    type="password"
                    class="form-control"
                    id="inputNewPassword"
                    v-model.trim="newPassword"
                  />
                </div>
              </div>
            </div>
            <h3 v-if="isCheckPassword">Password Hien tai chua dung</h3>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetSetting"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="settingUser"
              data-bs-dismiss="modal"
            >
              Save {{ handleTitleModal() }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "../../stores/UserStore.js";
export default {
  props: {
    isSettingName: Boolean,
    isSettingProfileImage: Boolean,
    isSettingPassword: Boolean,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      image: "",
      profileImage: "",
      password: "",
      newPassword: "",
      isCheckPassword: false,
      VITE_APP_API_USERS: import.meta.env.VITE_APP_API_USERS,
      VITE_APP_UPLOAD_PROFILE_IMAGES: import.meta.env
        .VITE_APP_UPLOAD_PROFILE_IMAGES,
      userStore: useUserStore(),
    };
  },
  methods: {
    handleTitleModal() {
      if (this.isSettingName) {
        return "Change Name";
      }
      if (this.isSettingProfileImage) {
        return "Change Profile Image";
      }
      if (this.isSettingPassword) {
        return "Change Password";
      }
    },
    onFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        if ((e.target.name = "profileImage")) {
          this.image = img;
        }
      }
    },

    settingUser(e) {
      e.preventDefault();

      if (this.isSettingName) {
        this.userStore.updateName(
          this.VITE_APP_API_USERS,
          this.firstname,
          this.lastname
        );
      }
      if (this.isSettingProfileImage) {
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
            this.userStore.updateProfileImage(
              this.VITE_APP_API_USERS,
              this.profileImage
            );
            this.userStore.displayProfilePicture();
          } catch (error) {
            console.log(error.message);
          }
        }
      }
      if (this.isSettingPassword) {
        try {
          this.userStore.updatePassword(
            this.VITE_APP_API_USERS,
            this.password,
            this.newPassword
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
