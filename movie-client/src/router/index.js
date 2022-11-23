import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavoriteView from "../views/FavoriteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/favorites",
      name: "favorites",
      //chargé uniquement quand visitée
      component: FavoriteView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "all",
      component: HomeView,
    },
  ],
});

export default router;
