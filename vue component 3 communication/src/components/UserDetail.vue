<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>My name : {{ switchName() }}</p> 
        <p>My Age : {{ userAge }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        props: {
            userAge: Number,
            name: {
                type: String //validasi props dengan type string bisa juga required, default dll
            },
            resetFn: Function // menerima overan function dari induk, jadi function pada induk bisa digunakan pada anak
        },
        methods: {
            switchName() {
                return this.name.split("").reverse().join("");
            },
            resetName() {
                this.name = 'Max'
                this.$emit('nameWasReset', this.name) 
            }
        },
        created() {
            eventBus.$on('ageWasEdited', (age) => {
                this.userAge = age // nama age pada argument ke 2 adalah variabel yang akan di isi oleh data agewasedited dari userEdit.
                // lalu dioper ke variabel asli  pada komponen ini
                // console.log(age)
            })
           
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>

// mengirim kembali nilai yang dirubah pada komponen anak ke komponen induk
// this.$emit('nameWasReset', this.name) 
// dan pada induk tambahkan di inisialisasi
// @nameWasReset="name = $event"