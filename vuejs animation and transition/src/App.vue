<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <hr>
                <select v-model="alertAnimation" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br><br>
                <button class="btn btn-primary" @click="show = !show">Show Alert</button>
                <br><br>
                <transition :name="alertAnimation">
                <!-- name pada transition akan digunakan untuk spesifikasi dalam set animation css menjadi fade-enter, fade-enter-active, fade-leave, fade-leave-active nama awal tergantung dari name yang ditulis pada transition -->
                    <div class="alert alert-info" v-if="show">This is some info</div>
                <!-- transition disini hanya bisa menjalankan 1 element, jika lebih dari 1 itu hanya akan menjalankan secara bergantian dengan syarat kondisi berbeda -->
                </transition>

                <transition name="slide" type="animation" appear>
                    <!-- penting untuk menentukan type atau yang diutamakan ketika animation dan transition dicampur, karena ketika transition lebih lama dari pada animation maka akan terjadi perubaha tata letak -->
                    <div class="alert alert-info" v-if="show">This is some info</div>
                </transition>

                <transition 
                    enter-active-class="animated bounce"
                    leave-active-class="animated shake"
                    >
                    <!-- appear disini akan menjalankan langsung ketika mengakses halaman pertama kali -->
                    <div class="alert alert-info" v-if="show">This is some info</div>
                </transition>

                <transition :name="alertAnimation" mode="out-in">
                    <!-- mode="out-in" disini dimaksudkan agar menunggu div lain selesai baru dilakukan animation yang baru-->
                    <div class="alert alert-info" v-if="show" key="info">This is some info</div>
                    <div class="alert alert-warning" v-else key="warning">This is some warning</div>
                    <!-- key disini adalah untuk menandakan bahwa div tersebut berbeda, sehingga anima tersebut terlihat -->
                </transition>
                <hr>

                <button class="btn btn-primary" @click="load = !load">Load / Remove Element</button>
                <br><br>
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelled="enterCancelled"

                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled"
                    :css="false"
                >
                <!-- artinya :css=false diatas adalah jangan melihat css class karena kita tidak ingin menggunakannya  -->
                    <div style="width:100px; height: 100px; background-color:lightgreen;" v-if="load"></div>
                </transition>
                <hr>
                <button
                    class="btn btn-primary"
                    @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert' "
                >
                    Toggle Component
                </button>
                <br>
                <br>
                <transition name="fade" mode="out-in">
                    <component 
                    :is="selectedComponent"
                    ></component>
                </transition>
                <hr>
                <button class="btn btn-primary" @click="addItem">Add Item</button>
                <br>
                <br>
                <ul class="list-group">
                <transition-group name="slide">
                    <li 
                        class="list-group-item" 
                        v-for="(number, index) in numbers" 
                        :key="number" 
                        @click="removeItem(index)"> {{ number }}</li>
                </transition-group>
               </ul>
            </div>
        </div>
    </div>
</template>

<script>
import DangerAlert from './DangerAlert.vue'
import SuccesAlert from './SuccessAlert.vue'


    export default {
        data() {
            return {
                show: false,
                load: true,
                alertAnimation: 'fade',
                elementWidth: 100,
                selectedComponent: 'app-success-alert',
                numbers: [1,2,3,4,5]
            }
        },
        methods: {
            beforeEnter(el) {
                console.log('beforeEnter')
                this.elementWidth = 100;
                el.style.width = this.elementWidth + 'px';
            },
            enter(el, done) {
                console.log('enter')
                let round = 1;
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth + round * 10) + 'px';
                    round++;
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20);
            },
            afterEnter(el) {
                console.log('afterEnter')
            },
            enterCancelled(el) {
                console.log('enterCancelled')
            },
            beforeLeave(el) {
                console.log('beforeLeave')
                this.elementWidth = 300;
                el.style.width = this.elementWidth + 'px';
            },
            leave(el, done) {
                console.log('leave');
                let round = 1;
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth - round * 10) + 'px';
                    round++;
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20);
            },
            afterLeave(el) {
                console.log('afterLeave')
            },
            leaveCancelled(el) {
                console.log('leaveCancelled')
            },
            addItem() {
                const pos = Math.floor(Math.random() * this.numbers.length)
                this.numbers.splice(pos, 0, this.numbers.length + 1)
            },
            removeItem(index) {
                this.numbers.splice(index, 1)
            }
        },
        components: {
            appDangerAlert: DangerAlert,
            appSuccessAlert: SuccesAlert
        }
    }
</script>

<style>
    .fade-enter{
        /* class css yang hanya terpasang untuk satu frame awal */
        opacity: 0;
    }
    .fade-enter-active {
         transition: opacity 1s;
    }
    .fade-leave {
        /* opacity: 1; */
    }
    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }

    .slide-enter {
        opacity: 0;
    }
    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }
    .slide-leave {

    }
    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
        position: absolute;
        /* 
            position absolute akan memberika animasi ketika item ada yang dihapus untuk memindahkan item yang lain keposisi item yang dihapus
            kenpa menggunakan ini, karen class slide-move masih tidak berefek untuk animasi ketika item bergerak saat item yang lain tidak ada
        */
    }
    .slide-move{
        transition: transform 1s;
        /* ini untuk animasi ketika ada item ditambahkan, item yang memberikan ruang melakukan move kebawah secara animasi */
    }

    @keyframes slide-in {
        from{
            transform: translateY(20px);
        }
        to{
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from{
            transform: translateY(0);
        }
        to{
            transform: translateY(20px);
        }
    }

</style>
