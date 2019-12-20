(function (global, factory) {
    global.Vuex = factory()
})(this, function () {
    let Vue
    class Store {
        constructor(options) {
            //Vue代表的就是全局的vue
            let vm = new Vue({
                data: {
                    state: options.state
                }
            })
            // this.state = options.state || []
            this.state = vm.state

            this.mutations = {}
            let mutations = options.mutations || {}
            Object.keys(mutations).forEach(key => {
                this.mutations[key] = (option) => {
                    mutations[key].call(this, this.state, option)
                }
            })
            this.actions = {}
            let actions = options.actions || {}
            Object.keys(actions).forEach(key => {
                this.actions[key] = (option) => {
                    //第一个this把函数中的this改成store
                    //第二个this是传递给函数的实参 store
                    actions[key].call(this, this, option)
                }
            })
            this.getters = {}
            let getters = options.getters || {}
            Object.keys(getters).forEach(key => {
                Object.defineProperty(this.getters, key, {
                    get: () => {
                        return getters[key].call(this, this.state)
                    }
                })
            }) 
        }
        commit(type, option) {
            console.log(this.mutations, type);
            this.mutations[type](option)
        }
        dispatch(type, option) {
            this.actions[type](option)
        }
    }

    function install(_vue) {
        Vue = _vue;
        // console.log(666, _vue);
        //给当前项的每一个组件都混入了一个beforeCreate钩子函数
        //如果对应的某个组件 存在对应的钩子函数 则先执行混入的钩子函数
        _vue.mixin({
            beforeCreate() {
                //this是当前这个组件
                // console.log('beforeCreate', this);
                if (this.$options && this.$options.store) {
                    //证明该组件是根组件
                    //把对应的store放在了自身的$store上
                    this.$store = this.$options.store
                    console.log(111111);
                } else {
                    //这里的this都是 其他的后代组件
                    this.$store = (this.$parent && this.$parent.$store)
                }
            }
        })
    }

    function mapState(ary) {
        let obj = {}
        ary.forEach(key => {
            obj[key] = function () {
                //this 是当前的实例
                return this.$store.state[key]
            }
        })
        return obj
    }

    function mapGetters(ary) {
        let obj = {}
        ary.forEach(key => {
            obj[key] = function () {
                //this 是当前的实例
                return this.$store.getters[key]
            }
        })
        return obj
    }

    function mapActions(ary) {
        let obj = {}
        ary.forEach(key => {
            obj[key] = function (option) {
                this.$store.dispatch(key, option)
            }
        })
        return obj
    }

    function mapMutations(ary) {
        let obj = {}
        ary.forEach(key => {
            obj[key] = function (option) {
                this.$store.commit(key, option)
            }
        })
        return obj
    }
    return {
        Store,
        install,
        mapState,
        mapGetters,
        mapActions,
        mapMutations,

    }
})