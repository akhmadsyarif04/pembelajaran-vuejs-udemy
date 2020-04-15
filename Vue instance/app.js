
// ini adalah salah satu cara mendeklarasikan data pada vuejs diluar
// intance vuejs tersebut.
var data = {
  title: 'The VueJS Instance 1',
  showParagraph: false
}

var vm1 = new Vue({
  data: data,
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle('The VueJS Instance (Updated)');
      console.log(this.$refs)
      this.$refs.myButton.innerText = 'tes'
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
  computed: {
    lowercaseTitle: function() {
      return this.title.toLowerCase();
    }
  },
  watch: {
    title: function(value) {
      alert('Title changed, new value: ' + value);
    }
  }
});

vm1.$mount('#app1') // ini adalah salah satu cara untuk mount tamplate el pada vuejs

vm1.newProp = 'New!'
console.log(vm1.$data === data)
vm1.$refs.heading.innerText = 'Something else'

setTimeout(function() {
  vm1.title = "Change by timer"
  vm1.show()
}, 3000)

var vm2 = new Vue({
  el: "#app2",
  data: {
    title: 'The VueJS Instance 2',
  },
  methods: {
    onChange: function() {
      vm1.title = "Change!"
    }
  },
})

// dibawah ini vm3 juga adalah salah satu cara untuk mendefinisikan
// el (template) 
var vm3 = new Vue({
  template: '<h1>Hello!</h1>'
})

vm3.$mount()
document.getElementById('app3').appendChild(vm3.$el)

// jadi kesimpulannya vuejs bisa digunakan bersamaan dengan
// Javascript. seperti yang dilakukan diatas. instance vuejs bisa diset
// dari luar. vuejs bisa digunakan bersamaan dengan javascript. vuejs 
// bisa lebih dari 2 instance vuejs(new vue)

