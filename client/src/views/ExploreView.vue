<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapActions, mapState } from "pinia";
import GameCard from "../components/GameCard.vue";

export default {
  nama: "ExploreView",
  components: {
    GameCard,
  },
  data() {
    return {
      isUserScrolling: false,
    };
  },
  methods: {
    ...mapActions(useAshenoneStore, ["exploreGames", "flushExplore"]),
    onScroll() {
      this.isUserScrolling = window.scrollY > 0;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.exploreGames();
      }
    },
  },
  computed: {
    ...mapState(useAshenoneStore, ["explore"]),
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
    this.exploreGames();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    this.flushExplore();
  },
};
</script>

<template>
  <div class="row">
    <GameCard
      v-for="(game, index) in explore"
      :key="`game-${game.id}`"
      :game="game"
      :index="index"
    />
  </div>
</template>
