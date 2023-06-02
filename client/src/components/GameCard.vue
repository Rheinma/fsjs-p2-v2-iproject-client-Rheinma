<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapState } from "pinia";
import { RouterLink } from "vue-router";

export default {
  nama: "GameCard",
  components: { RouterLink },
  props: ["game", "index"],
  computed: {
    getReleaseDate() {
      return this.game.releaseDate.split("T")[0];
    },
    backgroundImage() {
      return `background-image: url(${this.game.imageUrl});background-repeat: no-repeat;
  background-size: 100% 100%;`;
    },
    ...mapState(useAshenoneStore, ["isVerified", "explore"]),
  },
  methods: {},
  created() {},
};
</script>

<template>
  <div class="col-sm-4 mt-4 mb-4" @scroll="onScroll">
    <div
      class="card"
      style="
        height: 44vh;
        box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.75);
      "
    >
      <div
        class="card-header d-flex justify-content-between align-items-center bg-dark text-white"
      >
        <h5 class="card-title mx-1 mb-0">{{ game.name }}</h5>
        <p class="card-text mx-1 mb-0">Release Date : {{ getReleaseDate }}</p>
      </div>
      <div
        class="card-body d-flex justify-content-end"
        :style="backgroundImage"
      ></div>
      <div
        class="card-footer d-flex justify-content-between align-items-center"
        style="background-color: black"
      >
        <div>
          <a href="#" class="btn btn-danger mx-2"
            >Rating : {{ game.rating }}</a
          >
          <a v-for="genre in game.Genres" class="btn btn-secondary mx-2">{{
            genre.name
          }}</a>
        </div>
      </div>
      <RouterLink
        v-show="isVerified"
        :to="`/games/${game.id}`"
        class="btn btn-secondary"
        style="border-radius: unset !important; border: none !important"
      >
        Reviews
      </RouterLink>
    </div>
  </div>
</template>
