<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label>Mail</label>
                    <input type="email" class="form-control" v-model="user.mail ">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <input type="text" class="form-control" v-model='node'>
                <br><br>
                <button class="btn btn-primary" @click="fetchData">Get Data</button>
                <br>
                <br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="u in users" :key="u">{{ u.username }} - {{ u.mail }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    mail: ''
                },
                users: [],
                resource: {},
                node: 'data'
            }
        },
        methods: {
            submit() {
                // this.$http.post('data.json', this.user)
                //     .then(response => {
                //         console.log(response)
                //     }, error => {
                //         console.log(error)
                //     })
                // $http adalah dari vue-resource
                // url diambil dari database yang dibuat pada firebase. dibagian menu realtime database bukan bagian cloud firestore.
                
                // penggunaan resource
                // this.resource.save({}, this.user)

                // costum penggunaan resource
                this.resource.saveAlt(this.user)
            },
            fetchData() {
                // this.$http.get('data.json')
                //     .then(response => {
                //         return response.json()
                //     })
                //     .then(data => {
                //         const resultArray = []
                //         for (let key in data) {
                //             resultArray.push(data[key])
                //         }
                //         this.users = resultArray
                //     })

                // penggunaan resource
                this.resource.getData({node: this.node}) // bisa saja menambahkan parameter lagi misal {node: this.node, number: this.number}
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        const resultArray = []
                        for (let key in data) {
                            resultArray.push(data[key])
                        }
                        this.users = resultArray
                    })
            }
        },
        created() {
            const customActions = {
                saveAlt: {method: 'POST', url: 'alternative.json'}, //  bisa dengan data.json seperti pada $http, jika menggunakan nama lain maka akan dibuat json nama lain difirebase
                getData: {method: 'GET'}
            }
            this.resource = this.$resource('{node}.json', {}, customActions); // jika pada getData ditambah seperti pada comment diatas maka disini juga perlu di isi misal '{node}/{number}.json', {}, customActions
            // tanda $ adalah artinya dari root vuejs. bukan dibuat sendiri
        }
    }
</script>

<style>
</style>

resource adalah alternatif dari penggunaan http pada vue-resource
