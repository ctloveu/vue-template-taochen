/*
 * name  require*
 */

const arr = [
    {
        path: 'templateManage-AED',
        component: (resolve) => require(['@planManagementP/templateManage/templateManageAED.vue'], resolve),
        name: '流程插件',
        permission: "test",
        meta: [],
    },
    {
        path: 'index',
        component: (resolve) => require(['@planManagementP/planManagement.vue'], resolve),
        permission: "test",
        name: '首页',
        meta: [],
    }
]

module.exports = {
    path: '/planManagement',
    component: (resolve) => require(['@planManagement/components/layout'], resolve),
    children: [
        ...arr,
    ]
}