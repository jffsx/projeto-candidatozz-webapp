// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
import ProcessResponse from './components/mixins/processResponse'
import store from './components/store/Store'
import Acl from './services/Acl'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueToastr, { defaultPosition: 'toast-top-right', defaultType: 'info', defaultTimeout: 6000 })
Vue.use(Acl, { router: router, fail: '/unauthorized' })

Vue.mixin({ ProcessResponse })

Vue.http.interceptors.push((request, next) => {
  const authUser = JSON.parse(window.localStorage.getItem('authUser'))

  request.headers.set('Accept', 'application/json')
  if (authUser != null) {
    request.headers.set('Authorization', 'Bearer ' + authUser.token.access)
  }

  next()
})

Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  http: {
    emulateJSON: true,
    emulateHTTP: true
  }
})
