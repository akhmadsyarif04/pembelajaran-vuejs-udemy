import stocks from '../../data/stocks'

const state = {
    stocks: []
}

const mutations = {
    'SET_STOCKS' (state, stocks) {
        state.stocks = stocks;
    },
    'RND_STOCKS' (state) {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5))
            // disini akan dilakukan perulangan kepada setiap data diarray stocks dimana stock.price akan diperbarui nilainya dengan
            // 1 + angka random - 0.5 lalu dikalikan dengan harga stock yang ada, dan selanjutnya dibulatkan angkanya
        });
    }
}

const actions = {
    buyStock: ({commit}, order) => {
        commit('BUY_STOCK', order) // menggunakan mutations BUY_STOCK dari file src/store/modules/portfolio.js 
        // kenapa bisa menggunakan mutations dari file lain? karena telah diimport pada file src/store/store.js sehingga menjadi 1 file
    },
    initStocks: ({commit}) => {
        commit('SET_STOCKS', stocks) // ini mengarahkan ke stocks import. jadi data pada data/stocks akan dikirim ke mutations SET_STOCKS untuk diset ke state.stocks
    },
    randomizeStocks: ({commit}) => {
        commit('RND_STOCKS')
    }
}

const getters = {
    stocks: state => {
        return state.stocks
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}