import axios from "axios"

let http = axios.create({
    // baseURL: '',  //打包之前这个位置  需要写成自己家后台的地址
    params: {
        t: Math.random()
    }
})

//请求拦截
http.interceptors.request.use(function (config) {
    if (config.data) {
        config.data.token = localStorage.getItem('token')
    }else{
        config.params.token = localStorage.getItem('token') 
    }
    return config
}, function (err) {
    return Promise.reject(err)
})

//响应拦截
http.interceptors.response.use(function (response) {
    return response.data
}, function (err) {
    return Promise.reject(err)
})
export default http