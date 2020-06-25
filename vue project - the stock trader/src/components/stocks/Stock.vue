<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-succes">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{stock.price}})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input 
                        type="number" 
                        class="form-control" 
                        placeholder="Quantity"
                        v-model="quantity"
                        :class="{danger: insufficientFunds}"
                    >
                    <!-- jika insufficientFunds true maka class danger aktif -->
                </div>
                <div class="pull-right">
                    <button 
                        class="btn btn-success"
                        @click="buyStock"
                        :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(+quantity)"
                        >
                        <!-- jika insufficient true maka disable, artinta tidak cuku dengan nilai yg diinputkan -->
                        {{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
                        <!-- jika insufficient true maka tombol akan menjadi Insufficient Funds jika false maka Buy -->
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .danger {
        border: 1px solid red;
    }
</style>

<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
        funds(){
            return this.$store.getters.funds;
        },
        insufficientFunds(){
            return this.quantity * this.stock.price > this.funds
            // jika hasil dari perkalian quantity dan stock price lebih besar dari funds maka return true
        }
    },
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id, // dari props
                stockPrice: this.stock.price, // dari props
                quantity: this.quantity
            }
            this.quantity = 0
            this.$store.dispatch('buyStock', order) // akan menjalankan actions buyStock src/store/modules/stocks.js dengan param order
        }
    }
}
</script>

:disabled="quantity <= 0 || !Number.isInteger(+quantity)
jika nilai quantity kurang sama dengan 0 atau nilai pada quantity bukan integer maka disable