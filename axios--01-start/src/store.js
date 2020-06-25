import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData){
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser(state, user){
      state.user = user
    },
    clearAuthData(state){
      state.idToken = null 
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer({commit}, expiredTime) {
      setTimeout(() => { // setika 1jam akan logout
        commit('clearAuthData') 
        router.replace('/signin') // redirect ke signin
      // }, expiredTime * 1000) // mengubah dari milidetik ke detik
      }, expiredTime) // disini mencoba auto logout dalam 3,6detik
    },
    signup ({commit, dispatch}, authData) {
      axios.post('/accounts:signUp?key=AIzaSyACbpP43xv3it2h4N_Edl5naMTn22vdZPk', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res)
        const now = new Date()
        const expireDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('expireDate', expireDate)
        
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        dispatch('storeuser', authData) // disini juga akan menjalan storeuser pada actions
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
      })
    },
    login ({commit, dispatch}, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyACbpP43xv3it2h4N_Edl5naMTn22vdZPk', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res)

        const now = new Date()
        const expireDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('expireDate', expireDate)


        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        }) // ketika login selesai akan menjalankan mutations authUser
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
      })
    },
    tryAutoLogin({commit}) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const expireDate = localStorage.getItem('expireDate')

      if (!token) {
        return
      }
      const now = new Date()
      if (now >= expireDate) {
        return
      }
      commit('authUser', {
        token: token,
        userId: userId
      })

    },
    logout({commit}){
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expireDate')

      router.replace('/signin') // redirect ke signin
    },
    storeuser({commit, state}, userData){
      if (!state.idToken) { // jika token tidak ada
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser ({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken) // seharusnya akan mengambil data per token id, tapi ini malah semua 
      .then(res => {
        console.log(res)
        const data = res.data
        const users = []
        for(let key in data){
          const user = data[key]
          user.id = key
          users.push(user)
        }
        console.log(users)
        // this.email = users[0].email
        commit('storeUser', users[0]) // untuk mengambil email
      })
      .catch(err => console.log(err))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})