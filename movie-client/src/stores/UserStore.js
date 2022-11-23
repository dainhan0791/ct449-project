import axios from "axios";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {},
      isLogin: false,
      token: "",
    };
  },

  actions: {
    async registerUser(url, data) {
      const result = await axios.post(`${url}register`, data);
      if (result.data) {
        this.token = result.data.token;
        this.user = result.data.user;
        this.isLogin = true;
        // Save Storage
        this.saveTokenToStorage(this.token);
        this.saveProfileToStorage(this.user);
      }
    },
    async loginUser(url, data) {
      const result = await axios.post(`${url}login`, data);
      if (result.data) {
        this.token = result.data.token;
        this.user = result.data.user;
        this.isLogin = true;

        this.saveTokenToStorage(this.token);
        this.saveProfileToStorage(this.user);
      }
    },
    saveTokenToStorage(token) {
      window.localStorage.setItem("token", JSON.stringify(token));
    },
    saveProfileToStorage(profile) {
      window.localStorage.setItem("profile", JSON.stringify(profile));
    },
    getTokenFromStorage() {
      let token = JSON.parse(window.localStorage.getItem("token"));
      if (token) {
        this.getProfileFromStorage();
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    getProfileFromStorage() {
      let profile = JSON.parse(window.localStorage.getItem("profile"));
      this.user = profile;
    },
    logoutUser() {
      this.isLogin = false;
      this.user = {};
      window.localStorage.clear();
    },
    async uploadProfileImage(url, formData) {
      await axios.post(url, formData);
    },
    displayName() {
      if (this.user.firstname != undefined && this.user.lastname != undefined) {
        return `${this.user.firstname} ${this.user.lastname}`;
      } else {
        return "you haven't logged in yet";
      }
    },
    displayProfilePicture() {
      if (this.user.profileImage != undefined) {
        return `${import.meta.env.VITE_APP_PUBLIC_PROFILE_IMAGES}${
          this.user.profileImage
        }`;
      }
      return `${
        import.meta.env.VITE_APP_PUBLIC_PROFILE_IMAGES
      }defaultProfileImage.jpg`;
    },

    async updateName(url, firstname, lastname) {
      this.user.firstname = firstname;
      this.user.lastname = lastname;
      this.saveProfileToStorage(this.user);
      try {
        await axios.put(`${url}${this.user._id}`, {
          _id: this.user._id,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateProfileImage(url, profileImage) {
      this.user.profileImage = profileImage;
      this.saveProfileToStorage(this.user);
      await axios.put(`${url}${this.user._id}`, {
        _id: this.user._id,
        profileImage: this.user.profileImage,
      });
    },
    async updatePassword(url, password, newPassword) {
      if (password) {
        this.loginUser(url, {
          username: this.user.username,
          password: password,
        })
          .then(async () => {
            await axios.put(`${url}${this.user._id}`, {
              _id: this.user._id,
              password: newPassword,
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
  },
});
