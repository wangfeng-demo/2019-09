let userlistMoudle = (function () {
    let $selectBox = $('.selectBox'),
        $searchInp = $('.searchInp'),
        $deleteAll = $('.deleteAll'),
        $tableBox = $('.tableBox'),
        $thead = $tableBox.find('thead'),
        $tbody = $tableBox.find('tbody'),
        $theadTH = $thead.find('th');

    let power = localStorage.getItem('power') || '';
    power = decodeURIComponent(power);
    //userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
    let checkPower = function () {
        if (!power.includes('userhandle')) {
            $deleteAll.remove();
            $theadTH.eq(0).remove();
            $theadTH.eq($theadTH.length - 1).remove();
        }
    }
    let render = function () {
        let departmentId = $selectBox.val();
        search = $searchInp.val().trim();
        return axios.get('/user/list', {
            params: {
                departmentId,
                search
            }
        }).then(result => {
            let {
                data,
                code
            } = result;
            if (parseFloat(code) === 0) {
                return data
            }
            return Promise.reject()
        }).then(data => {
            let str = '';
            data.forEach(item => {
                let {
                    id,
                    name = '',
                    sex = '',
                    email = '',
                    phone = '',
                    department = '',
                    job = '',
                    desc = '',
                } = item;
                str += `
                    <tr data-id = "${id}" data-name = "${name}">
                    ${power.includes('userhandle')?'<td class="w3"><input type="checkbox"></td>':''}
                    <td class="w10">${name}</td>
                    <td class="w5">${sex == 0?'男':'女'}</td>
                    <td class="w10">${department}</td>
                    <td class="w10">${job}</td>
                    <td class="w15">${email}</td>
                    <td class="w15">${phone}</td>
                    <td class="w20">${desc}</td>
                    ${power.includes('userhandle')?`<td class="w12 btnBox">
                    <a href="javascript:;">编辑</a>
                    <a href="javascript:;">删除</a>
                    <a href="javascript:;">重置密码</a>
                </td>`:''}
                </tr>`
            })
            $tbody.html(str);
        }).catch(() => {
            $tbody.html('');
        }).then(() => {
            handleCheck();
        })

    }
    let selectBind = function () {
        return axios.get('/department/list').then(result => {
            if (parseInt(result.code) === 0) {
                let str = `<option value="0">全部</option>`;
                result.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                })
                $selectBox.html(str);
            }
        })
    }
    let handleChange = function () {
        $selectBox.on('change', render);
        $searchInp.on('keydown', function (e) {
            if (e.keyCode == 13) {
                render()
            }
        })
    }
    let handleDelete = function () {
        $tbody.click(function (e) {
            let target = e.target,
                tarTag = target.tagName,
                tarVal = target.innerText,
                $target = $(target);
            if (tarTag === 'A' && tarVal === '重置密码') {
                let $grendpa = $target.parent().parent(),
                    userId = $grendpa.attr('data-id'),
                    userName = $grendpa.attr('data-name');
                alert(`确定要把${userName}的密码重置吗？`, {
                    title: '警告！！！警告！！！',
                    confirm: true,
                    handle: msg => {
                        if (msg === 'CONFIRM') {
                            axios.post('/user/resetpassword', {
                                userId,
                            }).then(result => {
                                if (parseFloat(result.code) == 0) {
                                    alert('恭喜，当前操作成功')
                                }
                                alert('当前操作失败，请稍后重试')
                            })
                        }
                    }
                })
                return
            }
            if (tarTag === 'A' && tarVal === '删除') {
                let $grendpa = $target.parent().parent(),
                    userId = $grendpa.attr('data-id'),
                    userName = $grendpa.attr('data-name');
                alert(`确定要把${userName}删除吗？`, {
                    title: '警告！！！警告！！！',
                    confirm: true,
                    handle: msg => {
                        if (msg === 'CONFIRM') {
                            axios.post('/user/resetpassword', {
                                userId,
                            }).then(result => {
                                if (parseFloat(result.code) == 0) {
                                    alert('恭喜，当前操作成功')
                                }
                                alert('当前操作失败，请稍后重试')
                            })
                        }
                    }
                })
            }
        })
        return
    }
    let handleCheck = function () {
        let $checkHead = $thead.find('input[type = "checkbox"]'),
            $checks = $tbody.find('input[type = "checkbox"]');
        $checkHead.click(function () {
            $checks.prop('checked', $(this).prop('checked'));
            $checks.click(function () {
                let flag = true;
                $checks.each((index, item) => {
                    if ($(item).prop('checked') === false) {
                        flag = false;
                        return
                    }
                })
                $checkHead.prop('checked', flag)
            })
        })
    }



    return {
        init() {
            checkPower();
            selectBind().then(() => {
                render()
            })
            handleChange();
            handleDelete();
        }
    }
})()
userlistMoudle.init();