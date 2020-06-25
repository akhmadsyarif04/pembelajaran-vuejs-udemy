<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light h2">
    <router-link to="/" class="navbar-brand">Stock Trader</router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <router-link to="/portfolio" activeClass="active" tag="li">
                <a class="nav-link">Portfolio</a>
            </router-link>
            <router-link to="/stocks" activeClass="active" tag="li">
                <a class="nav-link">Stocks</a>
            </router-link>

            <!-- <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li> -->

            <li 
                class="dropdown"
                >
                <a 
                    class="nav-link dropdown-toggle" 
                    href="#" id="navbarDropdown" 
                    role="button" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    @click="isDropdownOpen = !isDropdownOpen"
                    :class="{open: isDropdownOpen}"
                >
                    Save & Load
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#" @click="saveData">Save Data</a>
                    <a class="dropdown-item" href="#" @click="loadData">Load Data</a>
                </div>
            </li>
            <li>
                <a href="#" class="nav-link" @click="endDay">End Day</a>
            </li>

            <strong class="navbar-text navbar-right">Funds : {{ funds | currency }}</strong>
        </ul>
    </div>
    </nav>
</template>


<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            isDropdownOpen: false
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    },
    methods: {
        ...mapActions({
            randomizeStocks : 'randomizeStocks', // inisialisasi functions actiosn randomizeStocks
            fetchData : 'loadData' // diberikan inisialisasi agar tidak ada yang bentrok nama
        }),
        endDay() {
            this.randomizeStocks() // menggunakan function actions vuex store/modules/stocks.js 
        },
        saveData(){
            const data = {
                funds : this.$store.getters.funds,
                stockPortfolio : this.$store.getters.stockPortfolio,
                stocks : this.$store.getters.stocks,
            }

            this.$http.put('data.json', data);
            // $http adalah merujuka ke vue-resource
            // put menyimpan
            // data.json artinya disimpan sebagai data.json
        },
        loadData(){
            this.fetchData()
        }
    }
}
</script>