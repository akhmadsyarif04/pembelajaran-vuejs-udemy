import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from  './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes, // disini bisa saja disingkat menjadi routes aja tanpa perlu : routes lagi. karena jika nama sama cukup 1x saja bisa.
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {selector: to.hash}
    }
    return {x:0, y:0}
  }
})

// router.beforeEach((to, from, next) => { // ini akan jalan sebelum route 
//   console.log('global beforeEach')
//   next() //ini akan melanjutkan route untuk meload halaman
// })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
