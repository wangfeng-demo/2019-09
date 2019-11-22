let userListModel = (function () {
    let $selectBox = $('.selectBox'),
        $searchInp = $('.searchInp'),
        $tableBox = $('.tableBox'),
        $tbody = $tableBox.children('tbody'),
        $thead = $tableBox.find('thead'),
        $theadTH = $thead.find('th'),
        $deleteAll = $('.deleteAll');

    let power = localStorage.getItem('power') || '';
    power = decodeURIComponent(power);
    //=>权限校验
    let chechPower = function () {
        if (!power.includes('userhandle')) {
            $deleteAll.remove();
            $theadTH.eq(0).remove();
            $theadTH.eq($theadTH.length - 1).remove();
        }
    }

    // 从服务器获取数据数显数据绑定
    let render = function () {
        let departmentId = $selectBox.val();
        let search = $searchInp.val().trim();
        //=>获取数据
        return axios.get('/user/list', {
            params: {
                departmentId,
                search
            }
        }).then(result => {
            //=>数据渲染
            let {
                code,
                data
            } = result;
            if (parseFloat(code) === 0) {
                return data;
            }
            return Promise.reject()
        }).then(data => {
            //=>数据渲染
            let str = '';
            data.forEach(item => {
                let {
                    id,
                    name = '',
                    sex = 0,
                    department = '',
                    job = '',
                    email = '',
                    phone = '',
                    desc = '',

                } = item
                str += `
                <tr data-id = '${id}' data-name = '${name}'>
				${power.includes('userhandle')?`<td class="w3"><input type="checkbox"></td>`:``}
				<td class="w10">${name}</td>
				<td class="w5">${parseFloat(sex) === 0?'男':'女'}</td>
				<td class="w10">${department}</td>
				<td class="w10">${job}</td>
				<td class="w15">${email}</td>
				<td class="w15">${phone}</td>
				<td class="w20">${desc}</td>
				${power.includes('userhandle')?`<td class="w12">
                        <a href="javascript:;">编辑</a>
                        <a href="javascript:;">删除</a>
                        ${power.includes('resetpassword')?`<a href="javascript:;">重置密码</a>`:``}
                    </td>`:``}
                </tr>`
            });
            $tbody.html(str);
        }).catch(() => {
            $tbody.html('');
        }).then(() => {
            handleCheckbox();
        })
    }
    //=> 从服务器获取部门信息 在render之前操作 设置在下拉列表中
    let selectBind = function () {
        return axios.get('/department/list').then(result => {
            if (parseFloat(result.code) === 0) {
                let str = `<option value="0">全部</option>`;
                result.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`;
                });
                $selectBox.html(str)
            }
        })
    }
    let handleFilter = function () {
        $selectBox.on('change', render)
        $searchInp.on('keydown', function (ev) {
            if (ev.keyCode == 13) {
                //按下的是enter键
                render();
            }
        })
    }

    //=>基于事件委托处理员工的事件操作
    let handleDelegate = function () {
        $tbody.click(function (ev) {
            let target = ev.target,
                tarTag = target.tagName,
                tarval = target.innerText,
                $target = $(target);

            //=>重置密码
            if (tarTag === 'A' && tarval === '重置密码') {
                let $grendpa = $target.parent().parent(), //=>tr
                    userId = $grendpa.attr('data-id'),
                    userName = $grendpa.attr('data-name');
                alert(`确定要把${userName}的密码重置吗？`, {
                    title: '警告 ！警告！',
                    confirm: true,
                    handled: msg => {
                        if (msg === 'CONFIRM') {
                            //=>用户点的确定
                            axios.post('/user/resetpassword', {
                                userId
                            }).then(result => {
                                if (parseFloat(result.code) === 0) {
                                    alert('恭喜，当前操作成功')
                                }
                                alert('当前操作失败，请稍后重试')
                            });
                        }
                    }
                })
                return;
            }
            //=>删除
            if (tarTag === 'A' && tarval === '删除') {
                let $grendpa = $target.parent().parent(), //=>tr
                    userId = $grendpa.attr('data-id'),
                    userName = $grendpa.attr('data-name');
                alert(`确定要删除${userName}吗？`, {
                    title: '警告 ！警告！',
                    confirm: true,
                    handled: msg => {
                        if (msg !== 'CONFIRM') return
                        axios.get('/user/delete', {
                            params: {
                                userId
                            }
                        }).then(result => {
                            if (parseFloat(result.code) === 0) {
                                render();
                                return;
                            }
                            alert('当前操作失败，请稍后重试')
                        });
                    }
                })
                return;
            }
        })
    }
    //=>全选和非全选功能
    let handleCheckbox = function () {
        let $checkthead = $thead.find('input[type = "checkbox"]'),
            $checks = $tbody.find('input[type = "checkbox"]');
        $checkthead.click(function () {
            //=>点击实现全选 JQ设置属性有两种方法 一：attr 二：prop表单
            $checks.prop('checked', $(this).prop('checked'))
            $checks.click(function () {
                let flag = true;
                $checks.each((index, item) => {
                    if (($(item).prop('checked') === false)) {
                        flag = false;
                        return false; //=>结束循环
                    }
                })
                $checkthead.prop('checked', flag)
            })
        })
    }
    //=>批量删除
    let batchDelete = function () {
        //=>利用递归实现批量删除
        function deleteX(index, $selects) {
            if (index > ($selects.length - 1)){
                //=>证明都删除完了 重新渲染列表
                render()
                return
            }
            let $item = $selects.eq(index);
            let userId = $item.parent().parent().attr('data-id');
            axios.get('/user/delete', {
                params: {
                    userId
                }
            }).then(result => {
                if (parseInt(result.code) === 0) {
                    deleteX(index + 1, $selects)
                }
            })
        }
        $deleteAll.click(function () {
            let $selects = $tbody.find('input[type = "checkbox"]')
                .filter((index, item) => {
                    return $(item).prop('checked') === true;
                })
            if ($selects.length === 0) {
                alert('请先选中要删除的内容')
                return;
            }
            //=>包含了所有被选中的复选框  通过被选中的复选框找到id
            alert(`您确定要删除这${$selects.length}项吗？`, {
                title: '警告 ！警告！',
                confirm: true,
                handled: function (msg) {
                    if (msg !== 'CONFIRM') return;
                    deleteX(0,$selects)
                }
            })
        })
    }
    return {
        init() {
            chechPower();
            selectBind().then(() => {
                return render()
            })
            handleFilter()
            handleDelegate()
            batchDelete();
        }
    }
})()
userListModel.init();