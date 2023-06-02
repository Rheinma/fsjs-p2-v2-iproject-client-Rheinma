<script>
import { useAshenoneStore } from "../stores/ashenone";
import { mapState, mapActions, mapWritableState } from "pinia";
import axios from "axios";

export default {
  nama: "UserControlView",
  methods: {
    ...mapActions(useAshenoneStore, [
      "fetchUserDetails",
      "postUserUpdate",
      "verifyUser",
    ]),

    transactionTrigger() {
      this.verifyUser();
    },

    async checkOut() {
      const result = await axios.post(
        "http://localhost:3000/users/details/midtrans",
        { amount: 50000 },
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      );
      console.log(result);
      window.snap.pay(result.data.token, {
        onSuccess: (result) => { //Instead, they inherit the this value from the enclosing lexical scope.
          /* You may add your own implementation here */
          this.transactionTrigger();
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    },
  },
  computed: {
    ...mapState(useAshenoneStore, ["isVerified"]),
    ...mapWritableState(useAshenoneStore, ["loggedUserDetails"]),
    getUpdatedDate() {
      return this.loggedUserDetails.updatedAt.split("T")[0] || "-";
    },
    getCreatedDate() {
      return this.loggedUserDetails.createdAt.split("T")[0] || "-";
    },
  },
  created() {
    this.fetchUserDetails();
  },
};
</script>

<template>
  <div class="row">
    <div class="col-4 mt-4 m-auto">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h3 class="mx-1 my-1">User Details:</h3>
          <button
            v-show="isVerified == ''"
            @click="checkOut"
            class="btn btn-warning"
          >
            Verify User
          </button>
          <button v-show="isVerified == 'Verified'" class="btn btn-secondary">
            Verified User
          </button>
          <button v-show="isVerified == 'Rejected'" class="btn btn-danger">
            Verification Rejected
          </button>
        </div>
        <div class="card-body">
          <form @submit.prevent="postUserUpdate">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                v-model="loggedUserDetails.firstName"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                v-model="loggedUserDetails.lastName"
                type="text"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="birthDate">Birth Date</label>
              <input
                v-model="loggedUserDetails.birthDate"
                type="date"
                class="form-control"
              />
            </div>

            <button type="submit" class="btn btn-warning mt-3">Submit</button>
          </form>
        </div>
        <div class="card-footer">
          <p>User registered at : {{ getCreatedDate }}</p>
          <p>Data last modified at : {{ getUpdatedDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
