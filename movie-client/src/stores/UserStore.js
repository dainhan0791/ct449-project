import axios from "axios";
import { defineStore } from "pinia";
import { createToaster } from "@meforma/vue-toaster";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {},
      isLogin: false,
      toaster: createToaster({
        position: "top-right",
        dismissible: false,
      }),
    };
  },

  actions: {
    async registerUser(url, data) {
      try {
        const result = await axios.post(`${url}register`, data);
        if (result.data) {
          this.user = result.data;
          this.isLogin = true;

          // Save Storage
          this.saveTokenToStorage(this.user?.token);
          this.saveProfileToStorage(this.user);
          this.getTokenFromStorage(this.user.token);
          this.toaster.success("Register sucessfully");
        } else {
          this.toaster.error("Register Failed");
        }
      } catch (error) {
        console.log(error.message);
        if (error.message === "Request failed with status code 400") {
          this.toaster.warning("Username is already registered");
        }
        if (error.message === "Request failed with status code 500") {
          this.toaster.warning(
            "Password or Firstname or Lastname is not empty"
          );
        }
      }
    },
    async loginUser(url, data) {
      try {
        const result = await axios.post(`${url}login`, data);
        if (result.data) {
          this.user = result.data;
          this.isLogin = true;

          this.saveTokenToStorage(this.user.token);
          this.saveProfileToStorage(this.user);
          this.getTokenFromStorage(this.user.token);
          this.toaster.success("Login sucessfully");
        } else {
          this.toaster.error("Login Failed");
        }
      } catch (error) {
        if (error.message === "Request failed with status code 400") {
          this.toaster.warning("Password Incorrect");
        }
        if (error.message === "Request failed with status code 404") {
          this.toaster.warning("User does not exist");
        }
      }
    },
    saveTokenToStorage(token) {
      window.localStorage.setItem("token", JSON.stringify(token));
    },
    saveProfileToStorage(profile) {
      window.localStorage.setItem("profile", JSON.stringify(profile));
    },
    getTokenFromStorage(userToken) {
      let token = JSON.parse(window.localStorage.getItem("token"));
      let profile = JSON.parse(window.localStorage.getItem("profile"));
      if (
        token?.length >= 150 &&
        profile.token?.length >= 150 &&
        token?.length <= 1000 &&
        profile.token?.length <= 1000
      ) {
        if (token === userToken || token === profile?.token) {
          this.getProfileFromStorage();
          this.isLogin = true;
          this.toaster.show(
            `Welcome ${this.user.user.firstname} ${this.user.user.lastname} `
          );
        } else {
          this.isLogin = false;
          this.toaster.warning("Check Token Failed");
        }
      } else {
        localStorage.clear();
        this.toaster.info("You Can Login Now!");
      }
    },

    getProfileFromStorage() {
      let profile = JSON.parse(window.localStorage.getItem("profile"));
      this.user = profile;
    },

    logoutUser() {
      window.localStorage.clear();
      this.isLogin = false;
      this.getProfileFromStorage();
      this.toaster.success("Log Out Successfully");
    },

    async uploadProfileImage(url, formData) {
      await axios.post(url, formData);
    },
    displayName() {
      if (
        this.user?.user?.firstname != undefined &&
        this.user?.user?.lastname != undefined
      ) {
        return `${this.user.user.firstname} ${this.user.user.lastname}`;
      } else {
        return "";
      }
    },
    displayProfilePicture() {
      if (this.user?.user?.profileImage != undefined) {
        return `${import.meta.env.VITE_APP_PUBLIC_PROFILE_IMAGES}${
          this.user.user.profileImage
        }`;
      }
      return `${
        import.meta.env.VITE_APP_PUBLIC_PROFILE_IMAGES
      }defaultProfileImage.jpg`;
    },

    async updateName(url, firstname, lastname) {
      this.user.user.firstname = firstname;
      this.user.user.lastname = lastname;
      this.saveProfileToStorage(this.user);
      this.getProfileFromStorage();
      try {
        await axios.put(`${url}${this.user.user._id}`, {
          _id: this.user.user._id,
          firstname: this.user.user.firstname,
          lastname: this.user.user.lastname,
        });
        this.toaster.info("Update Your Name Successfully");
      } catch (error) {
        this.toaster.warning("Update Your Name Failed" + error.message);
      }
    },
    async updateProfileImage(url, profileImage) {
      try {
        await axios.put(`${url}${this.user.user._id}`, {
          _id: this.user.user._id,
          profileImage: this.user.user.profileImage,
        });
        this.user.user.profileImage = profileImage;
        this.saveProfileToStorage(this.user);
        this.getProfileFromStorage();
        this.toaster.info("Update Your Profile Image Successfully");
      } catch (error) {
        this.toaster.warning(
          "Update Your Profile Image Failed" + error.message
        );
      }
    },

    async updatePassword(url, password, newPassword) {
      if (password) {
        try {
          if (newPassword) {
            const result = await axios.post(`${url}login`, {
              username: this.user.user.username,
              password: password,
            });
            if (result.data) {
              await axios.put(`${url}${this.user.user._id}`, {
                _id: this.user.user._id,
                password: newPassword,
              });
              this.toaster.info("Update New Password Successfully");
            }
          } else {
            this.toaster.warning("New Password Is Not Empty");
          }
        } catch (error) {
          this.toaster.warning("Current Password Is Incorrect");
        }
      } else {
        this.toaster.warning("Please Enter Your Current Password");
      }
    },
  },
});
