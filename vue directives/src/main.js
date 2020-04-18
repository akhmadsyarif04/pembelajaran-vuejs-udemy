import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', {
  bind(el, binding, vnode) {
    // el.style.backgroundColor = 'green'
    // el.style.backgroundColor = binding.value  // binding adalah mendapatkan informasi yang dikirimkan oleh komponen yang menggunakan directive ini
    var delay = 0
    if (binding.modifiers['delayed']) {
      delay = 3000
    } 
    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value
      }else{
        el.style.color = binding.value
      }
    }, delay)
    
  }
}) // this is global directive


new Vue({
  el: '#app',
  render: h => h(App)
})
