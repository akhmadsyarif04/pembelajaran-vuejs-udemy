<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives</h1>
                <p v-text="'Some text'"></p>
                <p v-html="'<strong>Some strong text</strong>'"></p>
                <!-- akan tetapi cara ini tidak aman, karena ada celah xss scripting -->
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1> Costum Directives</h1>
                <!-- <p v-highlight>Color this</p>  -->

                <!-- <p v-highlight="'red'">Color this</p>  -->
                <!-- v-highlight ini adalah nama directive yang ditulis global pada main.js untuk mengatur style -->

                <!-- <p v-highlight:background="'red'">Color this</p> -->
                <!-- setelah : adalah sebagai nama argument/arg pada binding -->

                <p v-highlight:background.delayed="'red'">Color this</p>  
                <!-- delayed adalah sebuah nama modifiers pada binding -->

                <p v-local-highlight:background.delayed.blink="{mainColor: 'blue', secondColor: 'green', delay: 500}">Color this</p>  

            </div>
        </div>
    </div>
</template>

<script>
    //  penulisan directive local
    export default {
        directives: {
            'local-highlight': {
                bind(el, binding, vnode) {
                    var delay = 0
                    if (binding.modifiers['delayed']) {
                        delay = 3000
                    } 
                    if (binding.modifiers['blink']) {
                        let mainColor = binding.value.mainColor
                        let secondColor = binding.value.secondColor
                        let currentColor = mainColor
                        setTimeout(() => {
                            setInterval(() => {
                                currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor
                                if (binding.arg == 'background') {
                                    el.style.backgroundColor = currentColor
                                }else{
                                    el.style.color = currentColor
                                }
                                }, binding.value.delay);
                        }, delay)
                    }else{
                        setTimeout(() => {
                            if (binding.arg == 'background') {
                                el.style.backgroundColor = binding.value.mainColor
                            }else{
                                el.style.color = binding.value.mainColor
                            }
                        }, delay)
                    }
                    
                    
                }
            }
        }
    }
</script>

<style>

</style>
