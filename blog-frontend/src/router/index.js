import { createRouter, createWebHistory } from "vue-router";
// import BlogList from "@/components/BlogList.vue";
import BLogCreate from "@/components/BLogCreate.vue";
import BlogEdit from "@/components/BlogEdit.vue";
import BlogVIew from "@/components/BlogVIew.vue";

const routes = [
  // { path: "/", component: BlogList },
  { path: "/create", component: BLogCreate },
  { path: "/edit/:id", component: BlogEdit },
  { path: "/", component: BlogVIew },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
