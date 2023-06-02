<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import axios from "axios";

export default {
  nama: "ReviewCard",
  data() {
    return {
      audio: "",
    };
  },
  components: { RouterLink },
  props: ["review"],
  computed: {
    getPostedDate() {
      return this.review.createdAt.split("T")[0];
    },
    ...mapState(useAshenoneStore, ["isVerified", "explore"]),
    audioSource() {
      return `data:audio/mpeg;base64,${this.audio}`;
    },
  },
  methods: {
    ...mapActions(useAshenoneStore, ["textToSpeech"]),
    // async textToSpeech(text) {
    //   try {
    //     const options = {
    //       method: "GET",
    //       url: "https://joj-text-to-speech.p.rapidapi.com/synthesize",
    //       params: { lang: "id-ID", text: text, speed: "0.5" },
    //       headers: {
    //         "X-RapidAPI-Key":
    //           "46223922d4msh2ca5fd58008bf09p191622jsn4e6bf15cc0bd",
    //         "X-RapidAPI-Host": "joj-text-to-speech.p.rapidapi.com",
    //       },
    //     };

    //     let data = await axios.request(options);
    //     data.src = "data:audio/mp3;base64,..."
    //     data.play()
    //   } catch (error) {
    //     console.log(error);
    //     Swal.fire({
    //       title: "An Error has occured...",
    //       icon: "error",
    //       text: error.response.data.message,
    //     });
    //   }
    // },
  },
  created() {},
};
</script>

<template>
  <div class="card my-3">
    <div
      class="card-header d-flex justify-content-between align-items-center bg-dark text-white"
    >
      <h5 class="card-title mx-1 mb-0">
        Posted By : {{ review.User.username }}
      </h5>
      <p class="card-text mx-1 mb-0">Posted On : {{ getPostedDate }}</p>
    </div>
    <div class="card-body bg-secondary d-flex justify-content-start">
      <p>{{ review.review }}</p>
    </div>
    <div
      class="card-footer d-flex justify-content-between bg-dark align-items-center"
    >
      Score : {{ review.score }} / 100
      <div>
        <!-- <button v-show="!audio" @click="textToSpeech(review.review)" class="btn-sm btn-danger">
          Play
        </button>
        <audio v-show="audio" controls :src="audioSource"></audio> -->
      </div>
    </div>
  </div>
</template>
