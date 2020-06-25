const state = {
    funds: 10000,
    stocks: []
}

const mutations = {
    'BUY_STOCK' (state, {stockId, quantity, stockPrice } ) {
        // stockId, quantity, stockPrice  berasal dari nilai pada  /stocks/stock.vue methods buyStock
        const record = state.stocks.find(element => element.id == stockId); // jika id pada state stocks sama dengan id pada pembelian
        if (record) {
            record.quantity += quantity //quantity pada state akan ditambah dengan quantity dari pembelian
        }else{
            state.stocks.push({
                id: stockId,
                quantity: quantity,
            })

            // jika salah maka tambahkan ke array stocks state
        }
        state.funds -= stockPrice * quantity // fund pada state akan dikurangkan dengan hasil dari perkalian stockPrice dan quantity
    },
    'SELL_STOCK' (state, { stockId, stockPrice, quantity}) {
        const record = state.stocks.find(element => element.id == stockId)
        if (record.quantity > quantity) {
            // jika quantity masih ada
            record.quantity -= quantity
        } else {
            // jika quantity tidak cukup atau sama dengan quantity
            state.stocks.splice(state.stocks.indexOf(record), 1)  // splice untuk menghapus/menambahkan kedalam array
            // hapus dari array berdasarkan index yang ditemukan pada array state stocks, hapus 1 item
        }
        state.funds += stockPrice * quantity
    },
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = portfolio.funds
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : []
    }
}

const actions = {
    sellStock({commit}, order) {
        commit('SELL_STOCK', order)
    }
}

const getters = {
    stockPortfolio (state, getters) {
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id) // element.id ke getters parameter, stock.id ke state.stocks
            // jika terdapat id yang sama pada getters yang dikirim dengan id pada state stocks
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        })
    },
    funds(state) {
        return state.funds
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}