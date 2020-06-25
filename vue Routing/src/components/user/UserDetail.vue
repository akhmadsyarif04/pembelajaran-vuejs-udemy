<template>
<div>
    <h3>Some User Details</h3>
    <hr>
    <p>User loaded ID : {{ $route.params.id }}</p>
    <router-link 
        tag="button"
        :to="link"
        class="btn btn-primary"
    >Edit User</router-link>
</div>
</template>

<script>
export default {
    data() {
        return {
            link: {
                name: 'userEdit', 
                params: {
                    id: this.$route.params.id 
                }, 
                query: { 
                    locale: 'en', 
                    q: 5 
                },
                hash: "#data"
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        if (false) { // disini lakukan pengecekan authentifikasi
            next(true) // jika true halaman akan diload
        }else{
            next(false) // jika false halaman tidak akan diload atau tidak akan bisa redirect ke sini
        }
    }
}
</script>