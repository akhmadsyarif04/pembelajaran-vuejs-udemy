<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <button @click="navigationHome" class="btn btn-primary">Go To Home</button>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        navigationHome(){
            this.$router.push('/')
            // tanda $ berarti dari package vuejs
            // push() untuk mempush tumpukan route yang ada sehingga ketika diklik back dan maju akan berfungsi dengan baik karena menyimpan route lama 
        }
    }
}
</script>