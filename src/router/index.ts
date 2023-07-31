import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PluginView from "@/views/PluginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: PluginView,
    children: [
      { path: "tab/:tab", component: PluginView, name: "tab", props: true },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
