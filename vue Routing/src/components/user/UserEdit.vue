<template>
<div>
    <h3>Edit the User</h3>
    <p>Locale : {{ $route.query.locale }}</p>
    <p>Q : {{ $route.query.q }}</p>
    <hr>
    <button class="btn btn-primary" @click="confirmed = true">Confirm</button> 
    <!-- button diatas hanya digunakan untuk melakukan perubahan value pada confirmed -->
    <div style="height: 700px"></div>
    <p id="data">Some extra data</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            confirmed: false
        }
    },
    beforeRouteLeave (to, from, next) { // jadi ini untuk melakukan pengecekan jika meninggalkan halaman
        if (this.confirmed) {
            next()
        }else{
            if (confirm('Apakah kamu yakin?')) {
                next()
            }else{
                next(false)
            }
        }
    }
}
</script>