import App from "./App";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import Demo from "./components/demo.vue";

export function createApp() {
  const app = createSSRApp(App);

  // #ifdef MP-WEIXIN
  app.mixin({
    onShareAppMessage: function () {
      return {
        title: "美观、易用的多端 UI 组件库",
      };
    },
    onShareTimeline: function () {
      return {
        title: "美观、易用的多端 UI 组件库",
      };
    },
  });
  // #endif

  app.component("Demo", Demo);

  return {
    app,
  };
}
// #endif
