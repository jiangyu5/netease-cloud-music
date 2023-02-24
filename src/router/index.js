import { createRouter, createWebHashHistory } from "vue-router";
import routeDiscovery from "./discovery";
import routeMv from "./mv";
import routeMy from "./my";
import routeFriends from "./friends";
import routeAccount from "./account";

const routes = [
  {
    path: "/",
    redirect: "/discovery",
  },
  routeDiscovery,
  routeMv,
  routeMy,
  routeFriends,
  routeAccount
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
