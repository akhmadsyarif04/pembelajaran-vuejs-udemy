<template>
    <div>
        <h3>New Qoute</h3>
        <button @click="increase++">Increase</button>
        <p>{{ increase }}</p>
    </div>
</template>

<script>
export default {
   data() {
       return {
           increase: 0
       }
   },
   destroyed() {
       console.log('Destroyed')
   },
   deactivated() {
       console.log('Deactivited')
   },
   activated() {
       console.log('Activited')
   },
}
</script>

<style scoped>

    
</style>

deactivated() akan dieksekusi setiap kali berada di komponen dan memuat yang lain