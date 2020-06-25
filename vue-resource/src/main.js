import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource' // https://github.com/pagekit/vue-resource

Vue.use(
  VueResource
)

Vue.http.options.root = 'https://vuejs-http-udemy-6ad64.firebaseio.com/';
// set global url dari package VueResource. sehingga ketika penggunaan pada $http hanya ditulis kosong atau ''.
// https://github.com/pagekit/vue-resource/tree/develop/docs

// intercepting request push dirubah menjadi put
Vue.http.interceptors.push((requests, next) => {
  console.log(requests)
  if (requests.method == 'POST') {
    requests.method = 'PUT'
  }
  next(response => {
    // agar menampilkan data lagi
    response.json = () => {
      return {
        messages: response.body
      }
    }
  })
})

new Vue({
  el: '#app',
  render: h => h(App)
})
