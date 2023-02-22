export default {
  path: "/discovery",
  component: () => import("../views/page-discovery/index.vue"),
  redirect: "/discovery/personalized",
  children: [
    {
      path: "personalized",
      component: () =>
        import("../views/page-discovery/views/Personalized/index.vue"),
    },
    {
      path: "playlist",
      component: () =>
        import("../views/page-discovery/views/PlayList/index.vue"),
    },
    {
      path: "dj",
      component: () => import("../views/page-discovery/views/DJ/index.vue"),
    },
    {
      path: "toplist",
      component: () =>
        import("../views/page-discovery/views/TopList/index.vue"),
    },
    {
      path: "newsong",
      component: () =>
        import("../views/page-discovery/views/NewSong/index.vue"),
    },
  ],
};
