<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <!-- component dinamis  -->
                <button @click="selectedComponent = 'appQoute'">Qoute</button>
                   <button @click="selectedComponent = 'appAuthor'">Author</button>
                   <button @click="selectedComponent = 'appNew'">New</button>
                   <hr>
                   <p>{{ selectedComponent }}</p>
                   <keep-alive>
                       <component :is="selectedComponent">
                       <p>Default content</p>
                   </component>
                   </keep-alive>
                   
                <!-- component dinamis  -->
               <!-- <app-qoute>
                   <h2 slot="title">{{qouteTitle}}</h2>
                   <p slot="content">A wonderful qoute</p>
               </app-qoute> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Qoute from './components/Qoute.vue'
    import Author from './components/Author.vue'
    import New from './components/New.vue'


    export default {
        data() {
            return {
                qouteTitle: 'The Qoute',
                selectedComponent: 'appQoute'
            }
        },
        components: {
            appQoute: Qoute,
            appAuthor: Author,
            appNew: New
        }
    }
</script>

<style>
</style>

<component></component> adalah memungkinkan kita untuk melakukan penambahan komponen secara dinamis. 
setiap perpindahan component dengan cara <component></component> ini maka ketika berpindah component, component yang tadi akan didestroy perubaha data nya
cara agar data tetap ada ketika berpindah komponen adalah dengan membungkus <<component></component> dengan <keep-alive></keep-alive>