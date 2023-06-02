<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapActions, mapState } from "pinia";

export default {
  nama: "ReviewView",
  data() {
    return {
      reviewForm: {},
    };
  },
  methods: {
    ...mapActions(useAshenoneStore, ["fetchGameById",'postReview']),
    submitReview(reviewForm){
      this.postReview(reviewForm)
      this.$router.push({name : "game-detail"});
    },
  },
  computed: {
    ...mapState(useAshenoneStore, ["gameDetail"]),
    backgroundImage() {
      return `background-image: url(${this.gameDetail.imageUrl});background-repeat: no-repeat;
  background-size: 100% 100%;"`;
    },
  },
  created() {
    this.reviewForm = {
      review: "",
      score: 0,
    };
    if (!this.gameDetail.name) {
      console.log();
      this.fetchGameById(this.$route.params.id);
    }
  },
};
</script>

<template>
  <div class="container-fluid">
    <div>
      <div class="card m-4 justify-content-center" style="height: 130vh">
        <div
          class="class-header rounded-top text-white bg-dark d-flex justify-content-between"
        >
          <h1 class="m-3">{{ gameDetail.name }}</h1>
          <div class="d-flex justify-content-center">
            <button class="btn btn-dark" v-for="genre in gameDetail.Genres">
              {{ genre.name }}
            </button>
          </div>
        </div>
        <div class="card-body d-flex" :style="backgroundImage"></div>
        <div class="card-footer bg-dark text-white p-0">
          <div class="d-flex justify-content-between m-4">
            <h2>Posting Review for {{ gameDetail.name }}:</h2>
          </div>
          <div class="container-fluid my-4">
            <form @submit.prevent="submitReview(reviewForm)" class="m-4">
              <div class="form-group">
                <label for="YourReview">Your Review : </label>
                <textarea
                  v-model="reviewForm.review"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="10"
                ></textarea>
              </div>
              <div class="d-flex my-2 gap-2">
                <label class="align-self-center">Score:</label>
                <input
                  v-model="reviewForm.score"
                  type="number"
                  class="form-control mr-4"
                  placeholder="Score out of 100"
                  style="width: 10%"
                />
                <button class="btn btn-danger ml-4" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
