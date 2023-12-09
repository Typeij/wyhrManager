import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ImageLightbox from 'vue-image-lightbox';
import print from 'vue-print-nb'
import canvas from 'html2canvas'
Vue.use(canvas)
Vue.use(print)
Vue.component('image-lightbox', ImageLightbox);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  ImageLightbox,
  render: h => h(App)
}).$mount('#app')
