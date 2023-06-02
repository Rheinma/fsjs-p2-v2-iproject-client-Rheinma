import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
// import router from "../router"


const baseUrl = `http://localhost:3000`;
// const baseUrl = "https://individual-production.up.railway.app"


export const useAshenoneStore = defineStore("ashenone", {
  state: () => ({
    isLoggedIn: false,
    isVerified: "",
    isLoading: false,
    games: [],
    searchQuery: "",
    currentPage: 0,
    totalGame: 0,
    loggedUserDetails: {},
    gameDetail: {},
    explore: [],
  }),
  actions: {
    async googleLogin(payload) {
      try {
        this.isLoading = true;
        let { data } = await axios.post(
          `${baseUrl}/users/google-login`,
          {},
          {
            headers: { google_token: payload.credential },
          }
        );

        localStorage.setItem(`access_token`, data.access_token);
        localStorage.setItem(`username`, data.username);
        localStorage.setItem(`verified`, "Verified");
        this.loggedUserName = localStorage.getItem(`username`);
        this.isLoggedIn = true;
        this.isVerified = "Verified";
        this.router.push("/");
        this.isLoading = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome, ${this.loggedUserName}!`,
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        });
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          icon: "error",
          title: `An error has occured...`,
          html: error.response.data.message,
          showConfirmButton: false,
        });
      }
    },
    async postLogin(payload) {
      try {
        this.isLoading = true;
        const { data } = await axios.post(`${baseUrl}/users/login`, {
          email: payload.email,
          password: payload.password,
        });
        localStorage.setItem(`access_token`, data.access_token);
        localStorage.setItem(`username`, data.username);
        localStorage.setItem(`verified`, data.verified);
        this.isLoggedIn = true;
        this.isVerified = localStorage.getItem(`verified`);
        this.isLoading = false;
        Swal.fire({
          position: "top-end",
          title: "Success!",
          icon: "success",
          text: `Welcome back, ${data.username}!`,
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        });
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async postregister(payload) {
      try {
        this.isLoading = true;
        await axios.post(`${baseUrl}/users/register`, {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        });
        this.isLoading = false;
        let result = await Swal.fire({
          icon: "success",
          title: "Register successful!",
          text: "Do you want to login immediately?",
          showCancelButton: true,
          confirmButtonText: "Login",
        });

        if (result.isConfirmed) {
          const loginForm = {
            email: payload.email,
            password: payload.password,
          };
          await this.postLogin(loginForm);
        }
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          html: error.response.data.message.join("<br>"),
        });
      }
    },
    logout() {
      localStorage.clear();
      Swal.fire({
        position: "top-end",
        title: "Success!",
        icon: "success",
        text: `Logged out successfully!`,
        showConfirmButton: false,
        timer: 1250,
        timerProgressBar: true,
      });
      this.isLoggedIn = false;
      this.isVerified = "";
      // this.router.push({name : "home"});
    },
    flushGames() {
      this.currentPage = 0;
      this.games = [];
    },
    flushExplore() {
      this.explore = [];
    },
    flushSearch() {
      this.searchQuery = "";
    },
    async fetchGames(search) {
      try {
        this.currentPage++;
        this.isLoading = true;
        if (search) {
          this.searchQuery = search;
        }

        const current = Math.floor(this.games.length / 10);

        let url = `${baseUrl}/games`;

        url = current >= 1 ? url + `?page=${current + 1}` : url + `?page=1`;
        url = this.searchQuery ? url + `&search=${this.searchQuery}` : url;

        let { data } = await axios.get(url, {});

        this.totalGame = data.totalGame;

        data.games.forEach((el) => {
          this.games.push(el);
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async fetchGameById(id) {
      try {
        this.isLoading = true;
        let { data } = await axios.get(`${baseUrl}/games/${id}`, {});
        this.gameDetail = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async fetchUserDetails() {
      try {
        this.isLoading = true;
        let access_token = localStorage.getItem("access_token");
        let { data } = await axios.get(`${baseUrl}/users/details`, {
          headers: {
            access_token,
          },
        });

        this.loggedUserDetails = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async postUserUpdate() {
      try {
        this.isLoading = true;
        let access_token = localStorage.getItem("access_token");
        await axios.put(`${baseUrl}/users/details`, this.loggedUserDetails, {
          headers: {
            access_token,
          },
        });
        this.isLoading = false;
        Swal.fire({
          position: "top-end",
          title: "Success!",
          icon: "success",
          text: `User details updated successfully!`,
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        });
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async verifyUser() {
      try {
        console.log("RHEINNNNN");
        this.isLoading = true;
        let access_token = localStorage.getItem("access_token");
        let { data } = await axios.patch(
          `${baseUrl}/users/details/verify`,
          this.loggedUserDetails,
          {
            headers: {
              access_token,
            },
          }
        );

        localStorage.setItem(`verified`, `Verified`);
        this.isVerified = `Verified`;
        this.isLoading = false;
        Swal.fire({
          position: "top-end",
          title: "Success!",
          icon: "success",
          text: data.message,
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        });
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async exploreGames() {
      try {
        this.isLoading = true;
        const current = Math.floor(this.explore.length / 10);
        let url = `${baseUrl}/games/explore`;

        url = current >= 1 ? url + `?page=${current + 1}` : url;

        let access_token = localStorage.getItem("access_token");
        let { data } = await axios.get(url, {
          headers: {
            access_token,
          },
        });
        data.games.forEach((el) => {
          this.explore.push(el);
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async postReview(payload) {
      try {
        this.isLoading = false;
        let access_token = localStorage.getItem("access_token");
        let { data } = await axios.post(
          `${baseUrl}/reviews/${this.gameDetail.id}`,
          {
            review: payload.review,
            score: payload.score,
          },
          {
            headers: {
              access_token,
            },
          }
        );
        this.fetchGameById(this.gameDetail.id)
        this.isLoading = false;
        Swal.fire({
          position: "top-end",
          title: "Success!",
          icon: "success",
          text: data.message,
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        });
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
    async deleteReviews(id) {
      try {
        this.isLoading = true;
        let access_token = localStorage.getItem("access_token");
        let { data } = await axios.get(`${baseUrl}/reviews/${id}`, {
          headers: {
            access_token,
          },
        });
        this.loggedUserDetails = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Swal.fire({
          title: "An Error has occured...",
          icon: "error",
          text: error.response.data.message,
        });
      }
    },
  },
  getters: {},
});
