// var data = {
// 	status: 'Critical'
// }

// vue component secara global
// Vue.component('my-cmp', {
// 	// data: function(){
// 	// 	return data;
// 	// },
// 	data: function(){
// 		return {
// 			status : 'Critical'
// 		}
// 	},
// 	template: '<p>Server status : {{status}} (<button @click="changeStatus">Change</button>)</p>',
// 	methods: {
// 		changeStatus: function() {
// 			this.status = 'Normal'
// 		}
// 	},
// })

var cmp = {
	data: function() {
		return {
			status: 'Critical'
		}
	},
	template: '<p>Server status : {{status}} (<button @click="changeStatus">Change</button>)</p>',
	methods: {
		changeStatus: function() {
			this.status = 'Normal'
		}
	},
}

new Vue({
	el: '#app',
	components: {
		'my-cmp' : cmp //cara mendaptarkan component yang diluar vue. secara lokal.
	}
})

new Vue({
	el: '#app2', // komponen vue secara global
})


// jika sumber data berada diluar komponen vue disini maka ketika ada perubahan di 1 objek akan 
// mengganti semua objek. tetapi jika sumber data ditulis didlm vue nya maka yang berubah hanya objek
// tersebut aja.

