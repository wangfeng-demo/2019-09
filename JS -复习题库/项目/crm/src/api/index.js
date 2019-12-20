import http from './http'
export function judgeLogin() {
    return http.get('/user/login').then((data) => {
        if (data.code == 0) {
            return data.code == 0
        }
    })
}
//获取用户详细信息
export function getUser() {
    return http.get('/user/info')
}
//请求部门列表数据
export function getDpList() {
    return http.get('/department/list')
}
//删除部门列表中的数据
export function delDpList(departmentId) {
    return http.get('department/delete', {
        params: {
            departmentId
        }
    })
}
//新增部门列表数据
export function addDpList(option) {
    return http.post('/department/add', option)
}
//更新部门接口
export function upDataDpList(option) {
    return http.post('/department/update', option)
}
//获取用户列表接口
export function getUserList(option) {
    return http.get('/user/list', {
        params: option
    })
}
//请求职务列表接口
export function getJobList() {
    return http.get('/job/list')
}
//删除员工
export function delUserList(userId) {
    return http.get('/user/delete', {
        params: {
            userId
        }
    })
}
//新增员工信息
export function addUserList(option) {
    return http.post('/user/add', option)
}
//更新员工信息
export function updataUserList(option) {
    return http.post('/user/update', option)
}
//更新职务信息
export function updataJobList(option) {
    return http.post('/job/update', option)
}
//新增职务
export function addJobList(option) {
    return http.post('/job/add', option)
}
//删除职务
export function delJobList(jobId) {
    return http.get('/job/delete', {
        params: {
            jobId
        }
    })
}
