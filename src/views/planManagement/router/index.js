/*
 * name  require*
 */

const arr = [{
        path: 'index',
        component: (resolve) => require(['@planManagementP/planManagement.vue'], resolve),
        name: '首页',
        meta: [],
    },
    {
        path: 'templateManage-AED',
        component: (resolve) => require(['@planManagementP/templateManage/templateManageAED.vue'], resolve),
        name: '流程插件',
        meta: [],
    },
    //子项目默认进入路由
    {
        path: '',
        redirect: 'templateManage-AED',
    }
]

const router = {
    path: '/planManagement',
    component: (resolve) => require(['@planManagement/components/layout'], resolve),
    children: [
        ...arr,
    ]
}

// export default router

module.exports = router