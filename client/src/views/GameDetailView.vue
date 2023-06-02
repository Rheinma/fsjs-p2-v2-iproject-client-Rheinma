<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapActions, mapState } from "pinia";
import ReviewCard from "../components/ReviewCard.vue";

export default {
  nama: "GameDetail",
  components: {
    ReviewCard,
  },
  data() {},
  methods: {
    ...mapActions(useAshenoneStore, ["fetchGameById"]),
  },
  computed: {
    ...mapState(useAshenoneStore, ["gameDetail"]),
    backgroundImage() {
      return `background-image: url(${this.gameDetail.imageUrl});background-repeat: no-repeat;
  background-size: 100% 100%;height:85vh`;
    },
    totalReview() {
      return this.gameDetail.UserReviews.length || 0;
    },
    hasPostedReview() {
      if (
        this.gameDetail.UserReviews.find(
          (el) => el.User.username == localStorage.getItem(`username`)
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    getStatus() {
      if(this.gameDetail.rating > 95) {
        return "Blazing!!"
      } else if (this.gameDetail.rating > 80) {
        return "Lit!"
      } else if (this.gameDetail.rating > 65) {
        return "Fine"
      } else if (this.gameDetail.rating > 33) {
        return "Faded..."
      } else {
        return "Dead."
      }
    }
  },
  created() {
    this.fetchGameById(this.$route.params.id);
  },
};
</script>

<template>
  <div class="container-fluid">
    <div>
      <div class="card m-4 justify-content-center" style="height: auto">
        <div
          class="class-header rounded-top text-white bg-dark d-flex justify-content-between"
        >
          <div class="d-flex justify-content-center align-items-center">
            <h1 class="m-3">{{ gameDetail.name }}</h1>
            <h2 class="m-3">Rating : {{ gameDetail.rating }}%</h2>
            <h2 class="m-3">{{ getStatus }}</h2>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-dark" v-for="genre in gameDetail.Genres">
              {{ genre.name }}
            </button>
          </div>
        </div>
        <div class="card-body d-flex" :style="backgroundImage"></div>
        <div class="card-footer bg-dark text-white p-0">
          <div class="d-flex justify-content-between m-4">
            <h1>{{ totalReview }} Reviews available</h1>
            <div v-show="!hasPostedReview">
              <RouterLink
                class="d-flex align-self-center btn btn-danger m-0 text-center"
                :to="`/games/${gameDetail.id}/review`"
              >
                + Add review
              </RouterLink>
            </div>
            <div v-show="hasPostedReview">
              <Button
                class="d-flex align-self-center btn btn-secondary m-0 text-center"
                >Already Posted a review</Button
              >
            </div>
          </div>
          <div class="container-fluid my-4">
            <ReviewCard
              v-for="review in gameDetail.UserReviews"
              :review="review"
              :key="`review-${review.id}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
