//=>在所有的操作之前 我们可以先做权限校验
$(function () {
    let power = localStorage.getItem('power'); 
    power = decodeURIComponent(power);
    if (!power === null) {
        alert('当操作属于非法进入 ，清重新登陆', {
            handled: () => {
                window.location.href = 'login.html'
            }
        })
        return
    }
    //userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
    let str = `
    <div class="itemBox">
    <h3>
        <i class="iconfont icon-yuangong"></i>
        员工管理
    </h3>
    <nav class="item">
        <a href="./page/userlist.html" target="iframeBox">员工列表</a>
        ${power.includes('userhandle')?`<a href="./page/useradd.html" target="iframeBox">新增员工</a>`:``}
    </nav>
</div>
<div class="itemBox">
    <h3>
        <i class="iconfont icon-guanliyuan"></i>
        部门管理
    </h3>
    <nav class="item">
        <a href="./page/departmentlist.html" target="iframeBox">部门列表</a>
        ${power.includes('departhandle')?`<a href="./page/departmentadd.html" target="iframeBox">新增部门</a>`:``}
    </nav>
</div>
<div class="itemBox">
    ${power.includes('jobhandle')?`<h3>
    <i class="iconfont icon-zhiwuguanli"></i>
    职务管理
</h3>
<nav class="item">
    <a href="./page/joblist.html" target="iframeBox">职务列表</a>
    <a href="./page/jobadd.html" target="iframeBox">新增职务</a>
</nav>`:``}
</div>
<div class="itemBox">
    <h3>
        <i class="iconfont icon-kehuguanli"></i>
        客户管理
    </h3>
    <nav class="item">
        <a href="./page/customerlist.html" target="iframeBox">我的客户</a>
        ${power.includes('departcustomer')||power.includes('allcustomer')?`<a href="./page/customerlist.html" target="iframeBox">全部客户</a>`:``}
        <a href="./page/departmentadd.html" target="iframeBox">新增客户</a>
    </nav>
</div>`
    $('.menuBox').html(str)
})
$(function () {
    let $header = $('.headerBox'),
        $baseBox = $header.find('.baseBox'),
        $spanName = $baseBox.find('span'),
        $sigoutBtn = $baseBox.find('a'),
        $menuBox = $('.menuBox'),
        $itemBox = $menuBox.find('.itemBox'),
        $navList = $('.navBox a'),
        $iframeBox = $('.iframeBox');

    //=>每次进入首页都要验证用户是否登录
    //Promise串行
    axios.get('/user/login').then(result => {
        if (parseFloat(result.code) === 0) {
            //已经登录过的：我们需要获取登录用户的基本信息
            return axios.get('/user/info');
        }
        alert('您还没有登录,请登录', {
            handled: function () {
                window.location.href = 'login.html'
            }
        });
        return Promise.reject();
    }).then(result => {
        //已经从服务器端获取到当前用户的基本信息
        if (parseFloat(result.code) === 0) {
            let data = result.data;
            $spanName.html(`欢迎:${data.name}`)
        }
    })
    //=>安全退出
    $sigoutBtn.click(function () {
        axios.get('/user/signout').then(result => {
            if (parseFloat(result.code) === 0) {
                //=>把本地的存储的POWER信息清除
                localStorage.removeItem('power');
                window.location.href = 'login.html'
                return
            }
            alert('当前操作失败，请稍后重试')
        })
    })

    //=>基于事件委托折叠菜单

    $menuBox.click(function (ev) {
        let target = ev.target,
            tarTag = target.tagName,
            $target = $(target);
        tarTag === 'I' ? ($target = $target.parent(), tarTag = 'H3') : null;
        if (tarTag === 'H3') {
            $target.next().stop().slideToggle(300)
        }
    })

    //=>点击导航实现menu的切换

    let $organize = $itemBox.filter(':lt(3)'),
        $customer = $itemBox.eq(3),
        initIndex = 0;
    HASH = window.location.href.queryURLParams()['HASH'] || 'organize';
    HASH === 'customer' ? initIndex = 1 : null;

    function change(index) { //分装函数 去除荣冗余代码
        $navList.eq(index).addClass('active').siblings().removeClass('.active')
        if (index === 0) {
            $organize.css({
                display: 'block'
            })
            $customer.css({
                display: 'none'
            })
            $iframeBox.attr('src', 'page/userlist.html')
        } else {
            $organize.css({
                display: 'none'
            })
            $customer.css({
                display: 'block'
            })
            $iframeBox.attr('src', 'page/customerlist.html')
        }
    }
    change(initIndex);
    $navList.click(function () {
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        change(index)
    })
})