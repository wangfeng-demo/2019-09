(function (global, factory) {
    global.VueRouter = factory();
})(this, function () {
    class VueRouter {
        constructor(options) {
            let {
                routes
            } = options
            //routes [{path:'' ,component:''}]
            //{'/a':a}
            this.routeMap = routes.reduce((obj, cur) => {
                obj[cur.path] = cur.component
                return obj
            }, {})
            window.addEventListener('load', () => {
                location.hash = location.hash || '/'
            })
            Vue.util.defineReactive(this,'_route','/')
            this._route = location.hash.slice(1)
            window.addEventListener('hashchange', () => {
                this._route = location.hash.slice(1)
            })
        }
    }
    VueRouter.install = function (_Vue) {
        console.log(_Vue);
        _Vue.mixin({
            beforeCreate() {
                console.log(this);
                if (this.$options && this.$options.router) {
                    this._router = this.$options.router;
                } else {
                    this._router = this.$parent._router
                }
            },
        })
        _Vue.component('router-link', {
            // template: `<a :href='"#"+to'><slot></slot></a>`,
            props: {
                to: String, //接受to属性 类型字符串
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                }, this.$slots.default)
            }
        })
        _Vue.component('router-view', {
            render(h) {
                return h(this._router.routeMap[this._router._route])
            }
        })
    }
    return VueRouter;
})