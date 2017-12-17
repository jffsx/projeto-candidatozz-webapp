// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueToastr from '@deveodk/vue-toastr'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueToastr, { defaultPosition: 'toast-top-right', defaultType: 'info', defaultTimeout: 6000 })

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Accept', 'application/json')
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  http: {
    emulateJSON: true,
    emulateHTTP: true
  }
})
