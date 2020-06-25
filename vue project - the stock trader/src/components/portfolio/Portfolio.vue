<template>
    <div>
        <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
        <!-- stocks yang digunakan pada for adalah state.stocks yang ada pada getters dipanggil dibawah pada file  src/store/modules/portfolio.js -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Stock from './Stock.vue'

export default {
    computed: {
        ...mapGetters({
            stocks: 'stockPortfolio' // menggunakan getters dari file src/store/modules/portfolio.js 
        }),
    },
    components: {
        appStock: Stock
    }
}
</script>