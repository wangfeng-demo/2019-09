$(function () {
    //DOM 结构加载完了
    let $userName = $('.userName'),
        $userPass = $('.userPass'),
        $submit = $('.submit');
    $submit.click(function () {
        let userName = $userName.val().trim(), //获取文本框内容
            userPass = $userPass.val().trim();
        //=>表单校验
        if (userName === '' || userPass === '') {
            alert('用户名密码不能为空~~')
            return;
        }
        //=>密码加密MD5
        userPass = md5(userPass); //32为字符串
        //发送请求 看登录的接口文档
        axios.post('/user/login', {
            account: userName,
            password: userPass
        }).then(result => {
            let {
                code,
                codeText,
                power
            } = result;
            if (parseFloat(code) === 0) {
                //登陆成功
                alert('恭喜您登录成功', {
                    //当弹出框消失的时候就会触发handled回调函数执行
                    handled: function () {
                        //=>把用户权限校验码存储在本地
                        localStorage.setItem('power', encodeURIComponent(power));
                        //=>跳转到首页即可
                        window.location.href = 'index.html'
                    }
                })
                return;
            }
            //=>登陆失败
            alert('当前用户名和密码不匹配，请重试')
        })
    })
})