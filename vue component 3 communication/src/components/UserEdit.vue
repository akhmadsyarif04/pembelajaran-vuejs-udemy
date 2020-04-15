<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
        <p>My Age : {{ userAge }}</p>
        <button @click="editAge()">Edit Age</button>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        props: ['userAge'],
        methods: {
            editAge() {
                this.userAge = 30
                // this.$emit('ageWasEdited', this.userAge) // untuk mengirimkan data age terbaru yang telah diedit pada komponen ini ke komponen induk
                // eventBus.$emit('ageWasEdited', this.userAge) // mengirim data age terbaru ke child lain dengan metode bus. disini untuk mengirim karena $emit jika $on maka menerima atau listern
                eventBus.changeAge(this.userAge) // ini adlah cara praktis mempermudah penulisan dengan cara membuat method pada mainjs eventbus. 
            }   
        }
    }
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
