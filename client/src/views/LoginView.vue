<script>
import { mapActions } from "pinia";
import { useAshenoneStore } from "../stores/ashenone";
import CustomButton from "../components/CustomButton.vue";
import { RouterLink } from "vue-router";

export default {
  name: "LoginView",
  components: {
    CustomButton,
    RouterLink,
  },
  data() {
    return {
      loginForm: {},
    };
  },
  methods: {
    ...mapActions(useAshenoneStore, ["postLogin", "googleLogin"]),
    submitLogin(loginForm){
      this.postLogin(loginForm)
      this.$router.push({name : "home"});
    },
    googleLoginHandler() {
      google.accounts.id.initialize({
        client_id:
          "585124525714-hr1p5l42h4p6jqomeif7ac4qugorhrqg.apps.googleusercontent.com",
        callback: this.googleLogin,
      });
      google.accounts.id.renderButton(document.getElementById("google-login"), {
        theme: "outline",
        size: "large",
      });
    },
  },
  mounted() {
    this.googleLoginHandler();
    this.loginForm = {
      email: "",
      password: "",
    };
  },
  watch: {
    $route() {
      this.googleLoginHandler();
    },
  },
};
</script>

<template>
  <div class="card container mt-5 p-0 rounded">
    <div class="card-body bg-secondary">
      <section class="mx-3">
        <form @submit.prevent="submitLogin(loginForm)">
          <h3>Login:</h3>
          <div class="form-group mt-3">
            <label for="login-email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="login-email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="loginForm.email"
            />
          </div>
          <div class="form-group mt-3">
            <label for="login-password">Password</label>
            <input
              type="password"
              class="form-control"
              id="login-password"
              placeholder="Password"
              v-model="loginForm.password"
            />
          </div>
          <CustomButton
            :name="'Login'"
            :type="'submit'"
            :displayClass="'btn btn-dark mt-3'"
          />
        </form>

        <div class="my-2">
          <p>Or login with Google :</p>
          <div>
            <div id="google-login"></div>
          </div>
        </div>

        <p class="mt-3">
          Don't have an account?
          <RouterLink :to="'/register'" class="mt-1 text-body">register here</RouterLink>
        </p>
      </section>
    </div>
  </div>
</template>
