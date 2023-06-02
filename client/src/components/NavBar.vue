<script>
import { RouterLink } from "vue-router";
import { useAshenoneStore } from "../stores/ashenone";
import { mapState, mapActions } from "pinia";

export default {
  nama: "NavBar",
  data() {
    return {
      displayName: "",
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    ...mapActions(useAshenoneStore, ["logout"]),
  },
  computed: {
    ...mapState(useAshenoneStore, ["isLoggedIn"]),
  },
  watch: {
    isLoggedIn() {
      this.displayName = localStorage.getItem(`username`);
    },
  },
  created() {
    if (localStorage.getItem(`username`)) {
      this.displayName = localStorage.getItem(`username`);
    }
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <RouterLink
        class="d-flex justify-content-center align-items-center navbar-brand px-5 m-0"
        :to="'/'"
        ><img src="../assets/dark-souls-bonfire.gif" height="55" />
        <h2 class="mb-0 mx-2">Soulslike</h2></RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDarkDropdown"
        aria-controls="navbarNavDarkDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="navbarNavDarkDropdown"
      >
        <ul class="navbar-nav mr-auto">
          <li v-show="!isLoggedIn" class="nav-item active">
            <RouterLink class="nav-link text-white" :to="'/login'"
              ><i class="bi bi-door-open"></i> Login</RouterLink
            >
          </li>
          <li v-show="!isLoggedIn" class="nav-item active">
            <RouterLink class="nav-link text-white" :to="'/register'"
              ><i class="bi bi-person-plus"></i> Register</RouterLink
            >
          </li>
          <li v-show="isLoggedIn" class="nav-item active">
            <RouterLink class="nav-link text-white" :to="'/'"
              ><i class="bi bi-door-open"></i> Home</RouterLink
            >
          </li>
          <li v-show="isLoggedIn" class="nav-item active">
            <RouterLink class="nav-link text-white" :to="'/explore'"
              ><i class="bi bi-book"></i> Explore</RouterLink
            >
          </li>
        </ul>

        <ul v-show="isLoggedIn" class="navbar-nav">
          <li class="nav-item dropdown mr-3">
            <a
              class="nav-link dropdown-toggle align-items-center"
              href="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ><i class="bi bi-person-circle"></i>
              {{ displayName }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <RouterLink class="dropdown-item" :to="'/user'"
                  ><i class="bi bi-info-square-fill"></i> User
                  Details</RouterLink
                >
              </li>
              <li>
                <a class="dropdown-item" href="/" @click.prevent="logout"
                  ><i class="bi bi-box-arrow-left"></i> Logout</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
