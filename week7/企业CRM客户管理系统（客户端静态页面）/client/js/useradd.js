let useaddModule = (function () {
    let $username = $('.username'),
        $spanusername = $('.spanusername'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $spanuseremail = $('.spanuseremail'),
        $userphone = $('.userphone'),
        $spanuserphone = $('.spanuserphone'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit');
    //=>下拉框内容的绑定
    let selectBind = function () {
        let Promise1 = axios.get('/department/list'),
            Promise2 = axios.get('/job/list');
        return axios.all([Promise1, Promise2]).then(results => {
            let [
                departmentResult,
                jobResult
            ] = results;
            if (parseInt(departmentResult.code) === 0) {
                //=>部门信息的绑定
                let str = '';
                departmentResult.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                });
                $userdepartment.html(str)
            }
            //=>职务信息绑定
            if (parseInt(jobResult.code) === 0) {
                //=>部门信息的绑定
                let str = '';
                jobResult.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                });
                $userjob.html(str)
            }
        })
    }
    //=>点击按钮提交信息
    let submitHandle = function () {
        $submit.click(function () {
            axios.post('/user/add', {
                name: $username.val().trim(),
                sex: $woman.prop('checked') ? 1 : 0,
                eamil: $useremail.val().trim(),
                phone: $userphone.val().trim(),
                departmentId: $userdepartment.val(),
                jobId: $userjob.val(),
                desc: $userdesc.val()
                
            }).then(result => {
                if (parseInt(result.code) === 0) {
                    alert('当前操作成功，即将跳转列表页', {
                        handled: () => {
                            window.location.href = 'userlist.html'
                        }
                    })
                    return;
                }
                return Promise.reject()
            }).catch(reason => {
                //=>一定是失败了
                alert('当前操作失败，请稍后重试');
            })
            return
        })
    }
    return {
        init() {
            selectBind().then(() => {
                submitHandle()
            }).catch(() => {
                alert('当前页面信息出现问题,请稍后重试', {
                    handled: () => {
                        window.location.href = 'userlist.html'
                    }
                })
            })
        }
    }
})()
useaddModule.init();