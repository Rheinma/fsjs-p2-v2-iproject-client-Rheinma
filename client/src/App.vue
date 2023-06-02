<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Preloader from "./components/Preloader.vue";
import { useAshenoneStore } from "./stores/ashenone";
import { mapWritableState } from "pinia";

export default {
  nama: "App",
  components: {
    RouterView,
    RouterLink,
    NavBar,
    Preloader
  },
  computed : {
    ...mapWritableState(useAshenoneStore,['isVerified','isLoggedIn','isLoading'])
  },
  created() {
    if(localStorage.getItem("access_token")) {
      this.isLoggedIn = true
      this.isVerified = localStorage.getItem('verified')
    }
  }
};
</script>

<template>
  <NavBar />
  <div v-show="isLoading">
    <Preloader />
  </div>
  <div class="container-fluid">
    <RouterView />
  </div>
</template>

<style></style>
