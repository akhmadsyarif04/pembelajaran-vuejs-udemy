<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my name</button>
        <p>My name is {{ name }}</p>
        <p>My Age is {{ age }}</p>

        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail 
                    :name="name" 
                    @nameWasReset="name = $event"
                    :resetFn="resetName"
                    :userAge="age"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit 
                    :userAge="age"
                    @ageWasEdited="age = $event"></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data: function(){
            return {
                name: 'Max',
                age: 18
            };
        },
        methods: {
            changeName() {
                this.name = 'Oni'
            },
            resetName() {
                this.name = 'Max'
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>

ada 2 cara untuk meoper data dari komponen child.
1. dari child ke induk lalu ke child yang lain.
dengan cari PROPS, lalu dengan this.$emit('ageWasEdited', this.userAge) dimana argumen 1 adalah var oper dan argument 2 adalah var asal data. 
lalu pada bagian induk tinggal listen dengan cara menambahkan pada komponen dihtml @ageWasEdited="age = $event". dimana @ageWasEdited adalah nama argument pertama pada $emit. lalu didalam nya diikuti nama var yang mau di isi data tersebut dan = $event
2. dari child ke child langsung tanpa melalu induk. 
dengan cara event bus.
pertama tulis pada main.js  export const eventBus = new Vue()
kedua pada child yang mau mengirim data tambahkan eventBus.$emit('ageWasEdited', this.userAge). Jangan lupa import { eventBus } from '../main'. Yang membedakan hanya eventBus sebelum $emit yang mana dari nama import yang digunakan. 
ketiga tambahkan pada siklus created seperti dibawah ini 
eventBus.$on('ageWasEdited', (age) => {
    this.userAge = age // nama age pada argument ke 2 adalah variabel yang akan di isi oleh data agewasedited dari userEdit.
    // lalu dioper ke variabel asli  pada komponen ini
})

jangan lupa import lebih dulu sepeti yang kedua tadi. 