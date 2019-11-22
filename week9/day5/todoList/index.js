Vue.directive('focus', function (el, obj) {
    if (obj.value) {
        el.focus()
    }
})
new Vue({
    el: "#app",
    data: {
        ary: [{
            id: 1,
            todo: '吃饭',
            done: false,
            editable: false
        }, {
            id: 2,
            todo: '睡觉',
            done: false,
            editable: false
        }, {
            id: 3,
            todo: '打豆豆',
            done: true,
            editable: false
        }],
        todo: "",
        hash: '', //存放当前路径的hash
    },
    created() {
        this.hash = location.hash || '#/all';
        window.addEventListener('hashchange', () => {
            this.hash = location.hash
        });
        this.ary = JSON.parse(localStorage.getItem('data')) || this.ary
    },
    methods: {
        submit() {
            this.todo = this.todo.trim();
            if (!this.todo) return
            let obj = {
                id: Math.random(),
                done: false,
                todo: this.todo,
                editable: false
            }
            this.ary.unshift(obj)
            this.todo = ''
        },
        change(item) {
            item.editable = !item.editable
        },
        del(obj) {
            this.ary = this.ary.filter(item => item.id != obj.id)
        }
    },
    computed: {
        count() {
            return this.ary.filter(item => !item.done).length
        },
        dotoAry() {
            //依赖于 ary 和hash
            switch (this.hash) {
                case '#/all':
                    //若是全部列表 把整个数组返回
                    return this.ary.filter(item => item.id)
                case '#/finished':
                    //若是全部列表 把整个数组返回
                    return this.ary.filter(item => item.done)
                case '#/unfinished':
                    return this.ary.filter(item => !item.done)
                default:
                    break
            }
        }
    },
    watch: {
        ary: {
            handler() {
                localStorage.setItem('data', JSON.stringify(this.ary))
            },
            deep: true
        }
    }
})