<template>
  <div className="header row justify-content-between">
    <div class="col-3">
      <nav>
        <ul>
          <RouterLink to="/" active-class="nav-active">
            <li>Home</li>
          </RouterLink>
          <RouterLink to="/favorites" active-class="nav-active">
            <li>Favorites</li>
          </RouterLink>
        </ul>
      </nav>
    </div>
    <div class="col-6">
      <h5>Light Movies</h5>
    </div>
    <div class="col-3">
      <div class="d-flex justify-content-center align-items-end">
        <p class="text-center mx-1 font-monospace name">
          {{ this.userStore.displayName() }}
        </p>
        <img
          :src="this.userStore.displayProfilePicture()"
          alt=""
          class="img-fluid profile-picture"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <div class="dropdown p-1">
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <div v-if="userStore.isLogin">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#SettingModal"
                  @click="setSettingName('name')"
                  >Change Name
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#SettingModal"
                  @click="setSettingName('profileImage')"
                  >Change Profile Image
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#SettingModal"
                  @click="setSettingName('password')"
                  >Change Password
                </a>
              </li>

              <li>
                <a class="dropdown-item" href="#" @click="userStore.logoutUser"
                  >Log Out</a
                >
              </li>
            </div>
            <div v-else>
              <li>
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#RegisterModal"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#LoginModal"
                >
                  Login
                </a>
              </li>
            </div>
          </ul>
        </div>

        <RegisterModal />
        <LoginModal />
        <SettingModal
          :isSettingName="isSettingName"
          :isSettingProfileImage="isSettingProfileImage"
          :isSettingPassword="isSettingPassword"
        />
      </div>
    </div>
  </div>
</template>
<script>
import RegisterModal from "./Modal/RegisterModal.vue";
import LoginModal from "./Modal/LoginModal.vue";
import SettingModal from "./Modal/SettingModal.vue";
import { useUserStore } from "../stores/UserStore";
export default {
  components: {
    RegisterModal,
    LoginModal,
    SettingModal,
  },
  data() {
    return {
      userStore: useUserStore(),
      isSettingName: false,
      isSettingProfileImage: false,
      isSettingPassword: false,
    };
  },
  methods: {
    setSettingName(name) {
      if (name === "name") {
        this.isSettingName = true;
        this.isSettingProfileImage = false;
        this.isSettingPassword = false;
      }

      if (name === "profileImage") {
        this.isSettingProfileImage = true;
        this.isSettingName = false;
        this.isSettingPassword = false;
      }
      if (name === "password") {
        this.isSettingPassword = true;
        this.isSettingName = false;
        this.isSettingProfileImage = false;
      }
    },
  },
};
</script>
