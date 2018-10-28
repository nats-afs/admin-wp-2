import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import store from "./store";
import router from "./router";
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(Vuetify);
Vue.use(VueQuillEditor);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
