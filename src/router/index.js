import Vue from "vue";
import Router from "vue-router";

import DashBoard from "../components/DashBoard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/DashBoard")
    },
    {
      path: "/settings",
      component: () => import("../components/Settings"),
      children: [
        {
          path: "",
          name: "settings",
          component: () => import("../components/SettingsForm")
        }
      ]
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../components/News"),
      children: [
        {
          path: "list",
          name: "news-list",
          component: () => import("../components/NewsList")
        },
        {
          path: "form",
          name: "news-form",
          component: () => import("../components/NewsForm")
        }
      ]
    },
    {
      path:'/distrito',
      name:'distrito',
      component: ()=> import('../components/Distrito'),
      children:[
        {
          path:'creacion',
          name:'creacion-distrito',
          component: ()=>import('../components/CreacionDistrito')
        }
      ]
    },
    {
      path: "/category",
      name: "category",
      component: () => import("../components/Category"),
      children: [
        {
          path: "list",
          name: "category-list",
          component: () => import("../components/CategoryList")
        },
        {
          path: "form",
          name: "category-form",
          component: () => import("../components/CategoryForm")
        }
      ]
    },
    {
      path: "/note",
      name: "note",
      component: () => import("../components/Note"),
      children: [
        {
          path: "list",
          name: "note-list",
          component: () => import("../components/NoteList")
        },
        {
          path: "form",
          name: "note-form",
          component: () => import("../components/NoteForm")
        }
      ]
    },
    {
      path: "/event",
      name: "event",
      component: () => import("../components/Event"),
      children: [
        {
          path: "list",
          name: "event-list",
          component: () => import("../components/EventList")
        },
        {
          path: "form",
          name: "event-form",
          component: () => import("../components/EventForm")
        }
      ]
    },
    {
      path: "/place",
      name: "place",
      component: () => import("../components/Place"),
      children: [
        {
          path: "list",
          name: "place-list",
          component: () => import("../components/PlaceList")
        },
        {
          path: "form",
          name: "place-form",
          component: () => import("../components/PlaceForm")
        }
      ]
    },
    {
      path: "/documents",
      name: "document",
      component: () => import("../components/Document"),
      children: [
        {
          path: "list",
          name: "document-list",
          component: () => import("../components/DocumentList")
        },
        {
          path: "form",
          name: "document-form",
          component: () => import("../components/DocumentForm")
        }
      ]
    }
  ]
});
