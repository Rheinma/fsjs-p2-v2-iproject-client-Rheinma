<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapActions, mapState } from "pinia";
import GameCard from "../components/GameCard.vue";

export default {
  nama: "HomeView",
  components: {
    GameCard,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    ...mapActions(useAshenoneStore, ["fetchGames", "flushGames", "flushSearch"]),
    onScroll() {
      this.isUserScrolling = window.scrollY > 0;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        if (this.games.length < this.totalGame) {
          console.log(this.games.length)
          console.log(this.totalGame);
          this.fetchGames();
        }
      }
    },
    fetchWithQuery() {
      this.flushGames();
      this.fetchGames(this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = "";
      this.flushGames();
      this.flushSearch();
      this.fetchGames();
    },
  },
  computed: {
    ...mapState(useAshenoneStore, ["games", "totalGame"]),
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
    this.fetchGames();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    this.flushGames();
  },
};
</script>

<template>
  <div class="card bg-dark mt-2">
    <div class="card-body">
      <form @submit.prevent="fetchWithQuery">
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-10 form-group text-white">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="search by title..."
            />
          </div>
          <div class="col-mx">
            <button type="submit" class="btn btn-info">Search</button>
          </div>
          <div class="col-mx">
            <button type="button" @click="clearSearch" class="btn btn-info">
              Clear Search
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row mb-4">
    <GameCard v-for="game in games" :key="`game-${game.id}`" :game="game" />
  </div>
</template>
