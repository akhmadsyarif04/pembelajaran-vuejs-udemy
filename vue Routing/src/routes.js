import Home from './components/Home.vue'
// import User from './components/user/User.vue'
// import UserDetail from './components/user/UserDetail.vue'
// import UserEdit from './components/user/UserEdit.vue'
// import UserStart from './components/user/UserStart.vue'
import Header from './components/Header.vue'

const User = resolve => { // sama seperti import diatas tapi disini hanya jika dibutuhkan saja, sehingga mengurangi bundel dalam webpack
    require.ensure(['./components/user/User.vue'], () => {
        resolve(require('./components/user/User.vue'))
    })
}

const UserDetail = resolve => { 
    require.ensure(['./components/user/UserDetail.vue'], () => {
        resolve(require('./components/user/UserDetail.vue'))
    })
}

const UserEdit = resolve => { 
    require.ensure(['./components/user/UserEdit.vue'], () => {
        resolve(require('./components/user/UserEdit.vue'))
    })
}

const UserStart = resolve => { 
    require.ensure(['./components/user/UserStart.vue'], () => {
        resolve(require('./components/user/UserStart.vue'))
    })
}


export const routes = [
    {
        path: '',
        name: 'home',
        components: {
            // jadi ini lah router-view multiple
            default: Home, // secara default tetap akan menampilkan component Home pada router-view biasa
            'header-top': Header // akan menampilkan component Header dirouter-view dengan nama header-top
        }
    },
    {
        path: '/user', 
        components: {
            default: User,
            'header-bottom': Header // akan menampilkan component Header dirouter-view dengan nama header-bottom
        },
        children: [
            { path: '', component: UserStart},
            { 
                path: ':id', 
                component: UserDetail, 
                beforeEnter: (to, from, next) => { // ini sama aja dengan global guard
                    console.log('inside route');
                    next()
                }
            },
            { path: ':id/edit', component: UserEdit, name: 'userEdit'},
        ]
    },
    { path: '/redirect-me', redirect: {name: 'home'} },
    { path: '*', redirect: '/' },

]