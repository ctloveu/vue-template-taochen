const arr = [
    // {
    //     path: 'index',
    //     component: (resolve) => require(['@socialPatrolP/index.vue'], resolve),
    //     name: '首页',
    //     meta: [],
    // },
    {
        path: 'direction/alertInfo',
        component: (resolve) => require(['@socialPatrolP/direction/alertInfo/alertInfo.vue'], resolve),
        name: '可视化',
        meta: [{ t: '可视化', p: '' }]
    },
    {
        path: '',
        redirect: 'direction/alertInfo',
    },

]

const router = {
    path: '/socialPatrol',
    component: (resolve) => require(['@socialPatrol/components/layout'], resolve),
    children: [
        ...arr,
    ]
}

// export default router

module.exports = router