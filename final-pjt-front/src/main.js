import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

import Carousel3d from 'vue-carousel-3d';

import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'

Vue.use(Vuetify)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(Carousel3d);
Vue.use(VueGlide)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
