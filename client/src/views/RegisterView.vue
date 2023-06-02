<script>
import { mapActions } from "pinia";
import { useAshenoneStore } from "../stores/ashenone";
import CustomButton from "../components/CustomButton.vue";
import { RouterLink } from "vue-router";

export default {
  nama: "RegisterView",
  components: {
    CustomButton,
    RouterLink,
  },
  data() {
    return {
      registerForm: {},
    };
  },
  methods: {
    ...mapActions(useAshenoneStore, ["postregister"]),
    submitRegister(registerForm){
      this.postregister(registerForm)
      this.$router.push({name : "home"});
    },
  },
  created() {
    this.registerForm = {
      username: "",
      email: "",
      password: "",
    };
  },
};
</script>

<template>
  <div class="card container mt-5 p-0 rounded">
    <div class="card-body bg-secondary">
      <section class="mx-3">
        <form @submit.prevent="postregister(registerForm)">
          <h3>Register:</h3>
          <div class="form-group mt-3">
            <label for="register-username">Username</label>
            <input
              type="text"
              class="form-control"
              id="register-username"
              aria-describedby="emailHelp"
              placeholder="Username..."
              v-model="registerForm.username"
            />
          </div>

          <div class="form-group mt-3">
            <label for="register-email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="register-email"
              placeholder="Email..."
              v-model="registerForm.email"
            />
          </div>

          <div class="form-group mt-3">
            <label for="register-password">Password</label>
            <input
              type="password"
              class="form-control"
              id="register-password"
              placeholder="Password..."
              v-model="registerForm.password"
            />
          </div>

          <CustomButton
            :name="'Register'"
            :type="'submit'"
            :displayClass="'btn btn-dark mt-3'"
          />
        </form>
        <p class="mt-3">
          I actually have an account!
          <RouterLink :to="'/login'" class="mt-1 text-body"
            >register here</RouterLink
          >
        </p>
      </section>
    </div>
  </div>
</template>
