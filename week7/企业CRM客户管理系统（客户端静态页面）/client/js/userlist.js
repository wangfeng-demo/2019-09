$(function () {
    let $tbody = $('.tableBox tbody'),
        $deleteAll = $('.deleteAll'),
        $selectAll = $('.tableBox thead .w3'),
        $handle = $('.tableBox thead .w12'),
        $selectItems = null,
        $deleteBtns = null,
        $resetBtns = null;

    let canShow = true;

    function role() {
        // 按照resetpassword这个权限进行判断，
        let power = localStorage.getItem('power');
        if (power.indexOf('resetpassword') == -1) {
            canShow = false;
            $deleteAll.hide();
            $selectAll.hide();
            $handle.hide();
        }
    }
    role();

    function getData(options = {}) {
        axios.get('/user/list', {
            params: options
        }).then((data) => {
            console.log(data);
            render(data.data);
            $selectItems = $('.tableBox tbody input[type=checkbox]');
            eventBind(); //数据渲染完成在去绑定事件
        }).catch(() => {
            alert('系统繁忙，稍后重试');
        })
    }

    function render(data = []) {
        let str = '';
        data.forEach(item => {
            let {
                id,
                name = '',
                sex = '',
                email = '',
                phone = '',
                departmentId = '',
                department = '',
                jobId = '',
                job = '',
                desc = ''
            } = item;
            str +=
                `<tr>
            ${canShow ? `<td class="w3"><input type="checkbox"></td>` : ''}
            
            <td class="w10">${name}</td>
            <td class="w5">${sex == 0 ? '男' : '女'}</td>
            <td class="w10">${department}</td>
            <td class="w10">${job}</td>
            <td class="w15">${email}</td>
            <td class="w15">${phone}</td>
            <td class="w20">${desc}</td>
            ${canShow ? ` <td class="w12 btnBox">
            <a href="./useradd.html?id=${id}">编辑</a>
            <a href="javascript:;" data-id=${id}>删除</a>
            <a href="./reset.html?id=${id}" data-id=${id}>重置密码</a>
            </td>`: ''}
           
            </tr> `;

        });
        $tbody.html(str);
    }
    getData();

    // 实现全选功能
    $selectAll.find('input').on('change', function () {
        console.log(this); //事件中的this都是原生的。
        $selectItems.get().forEach(item => {
            item.checked = this.checked;
        })

    })

    // 事件绑定
    function eventBind() {
        $deleteBtns = $('.tableBox tbody .btnBox a:nth-child(2)');
        $resetBtns = $('.tableBox tbody .btnBox a:nth-child(3)');
        //  给所有的删除按钮和重置按钮绑定点击事件
        $deleteBtns.on('click', function () {
            console.log(this);
            let ele = this;
            alert('确定删除吗？', {
                confirm: true,
                handled(type) {
                    console.log(type);
                    if (type == 'CONFIRM') {
                        // 这个时候要做的事情，就是怎么告诉前端对应的ID，删除那会成功之后，前端怎么移除这一条
                        deldteFn($(ele).attr('data-id'));
                    }
                }
            })
        })
        $resetBtns.on('click', function () {

        })
    }

    function deldteFn(id) {
        axios.get('/user/delete', {
            params: {
                userId: id
            }
        }).then((data) => {
            if (data.code == 0) {
                //删除成功
            }
        })
    }
    //获取下拉列表要展示的内容
    function initSelect() {
        axios.get('/department/list').then((data) => {
            let str = '<option value="0">全部</option>';
            data.data.forEach(item => {
                str += `<option value = "${item.id}">${item.name}</option>`
            })
            $('.selectBox').html(str)
        })
    }
    initSelect()
    // 选中下拉框指定内容时触发该函数
    $('.selectBox').on('change', function () {
        console.log(this.value);
        getData({
            departmentId: this.value
        })
    })
    //实现搜索框功能
    $('.searchInp').on('keydown', function (e) {
        if (e.keyCode == 13) {
            getData({
                departmentId: $('.selectBox')[0].value,
                search: this.value
            })
            this.value = ''; //敲回车清空内容
        }
    })
    //实现批量删除
    function batchDelete(){
        let items = $('tbody tr').get().filter(item=>{
            // 返回true 就把当前像放到新数组中
            return $(item).find('input[type="checkbox"]')[0].checked
        })
        //items 中存放的就是 选中的那几个 tr 
        let ary = [];
        items.forEach(item=>{
            // 获取要删除的这条数据的ID
            let id = $(item).find('a:nth-child(2)').attr('data-id');
            let p = axios.get('/user/delete?userId='+id)
            ary.push(p);
        })
        axios.all(ary).then(data=>{
            consolde.log(data)
        })
    }
    $deleteAll.on('click',batchDelete)
    
})