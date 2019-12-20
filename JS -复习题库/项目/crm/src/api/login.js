import http from './http'
let that = null;
export function init(_this) {
    that = _this
}
export function login(option) {
    return http.post('/user/login', option).then(data => {
        if (data.code == 1) {
            console.log(this,that);
            that.$alert('用户名或密码错误', '提示', {
                confirmButtonText: '确定',
            });
        }
        if (data.code == 0) {
            localStorage.setItem("power", encodeURIComponent(data.power));
        }
        return data //给后边的then的参数
    })
}
export function signout(){
    return http.get('/user/signout')
}