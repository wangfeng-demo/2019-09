let vm = new Vue({
    el: "#app",
    data: {
        name: "纪莹小宝贝",
        isSelect: false,
        title: '',
        hash: '',
        todos: [{
                isSelect: true,
                title: "吃饭"
            },
            {
                isSelect: false,
                title: "睡觉"
            }
        ]
    },
    created() {
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos
        this.hash = location.hash || '#/all'
        window.addEventListener('hashchange', () => {
            this.hash = location.hash
        })
    },
    methods: {
        content() {
            this.title = this.title.trim();
            if (!this.title) return
            let obj = {
                title: this.title,
                isSelect: false
            }
            this.todos.push(obj)
            this.title = ''
        },
        del(todo) {
            this.todos = this.todos.filter(item => item != todo)
        }
    },
    computed: {
        count() {
            return this.todos.filter(item => !item.isSelect).length
        },
        todoList() {
            if (this.hash == '#/all')return this.todos;
            if(this.hash == "#/finished"){
                return this.todos.filter(item=>item.isSelect)
            }
            if(this.hash === "#/unfinished"){
                return this.todos.filter(item=>!item.isSelect)
            }
        }
    },
    watch: {
        todos: {
            handler() {
                localStorage.setItem('data', JSON.stringify(this.todos))
            },
            deep: true
        }
    }
})