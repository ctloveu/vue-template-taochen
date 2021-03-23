// const arr = [
//     {
//         path: 'direction/alertInfo',
//         component: (resolve) => require(['@views/socialPatrol/direction/alertInfo/alertInfo.vue'], resolve),
//         name: '可视化',
//         meta: [{ t: '可视化', p: '' }]
//     },
// ]

module.exports = {
    path: '/test',
    component: (resolve) => require(['@views/test'], resolve),
    // children: [
    //     ...arr,
    // ]
}