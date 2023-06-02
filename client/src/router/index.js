import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserControlView from "../views/UserControlView.vue";
import GameDetailView from "../views/GameDetailView.vue";
import ExploreView from "../views/ExploreView.vue";
import ReviewView from "../views/ReviewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/user",
      name: "control-panel",
      component: UserControlView,
    },
    {
      path: "/games/:id",
      name: "game-detail",
      component: GameDetailView,
    },
    {
      path: "/explore",
      name: "explore",
      component: ExploreView,
    },
    {
      path: "/games/:id/review",
      name: "review-game",
      component: ReviewView,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (
//     localStorage.getItem("access_token") &&
//     (to.name == "login" || to.name == "register")
//   ) {
//     next ({ name: "home" });
//   } else if (
//     !localStorage.getItem("access_token") &&
//     (to.name == "explore" || to.name == "user" || to.name == "review-game")
//   ) {
//     next ({ name: "home" });
//   }
// });

export default router;
