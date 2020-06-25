import axios from 'axios'

const instance = axios.create({
    // baseURL: 'https://vue-axios-1-daf1b.firebaseio.com' // ini sama aja seperti baseURL Global
    baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance