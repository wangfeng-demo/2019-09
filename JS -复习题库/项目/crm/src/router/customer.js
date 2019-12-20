export default [{
        path: '/crm/my',
        name: 'my',
        component: () => import( /* webpackChunkName: "my" */ '@/components/customer/my'),
        meta: {
            type: 'crm',
            rootTil: '客户管理',
            til: '我的客户',
            icon: 'el-icon-user-solid',
            power: ''
        }
    },
    {
        path: '/crm/add ',
        name: 'add',
        component: () => import( /* webpackChunkName: "add" */ '@/components/customer/add'),
        meta: {
            type: 'crm',
            rootTil: '客户管理',
            til: '新增客户',
            icon: 'el-icon-user-solid',
            power: ''
        }
    },
    {
        path: '/crm/all',
        name: 'all',
        component: () => import( /* webpackChunkName: "all" */ '@/components/customer/all'),
        meta: {
            type: 'crm',
            rootTil: '客户管理',
            til: '全部客户',
            icon: 'el-icon-user-solid',
            power: 'allcustomer'
        }
    }
]