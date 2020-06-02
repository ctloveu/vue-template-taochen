var data_A = {
    name: '流程A',
    nodeList: [{
            id: 'nodeA',
            left: '26px',
            top: '161px',
            ico: 'el-icon-user-solid',
            show: true,
            type: "start",
            expand: true,
            // 流程名字
            name: 'A',
            // 资源类型Array
            resourceList: [{
                    id: 1,
                    name: '专家',
                    num: '10',
                },
                {
                    id: 2,
                    name: '指挥员1',
                    num: '10',
                },
                {
                    id: 3,
                    name: '指挥员2',
                    num: '10',
                }
            ],
            // 流程描述
            desc: '1111111111111111111',

        },
        {
            id: 'nodeB',
            left: '340px',
            top: '161px',
            ico: 'el-icon-goods',
            show: true,
            type: "end",
            expand: true,
            name: 'B',
            resourceList: [{
                    name: '专家',
                    num: '10',
                },
                {
                    name: '指挥员',
                    num: '10',
                }
            ],
            desc: '1111111111111111111',
        },
        {
            id: 'nodeC',
            left: '739px',
            top: '161px',
            ico: 'el-icon-present',
            show: true,
            type: "process",
            expand: true,
            name: 'C',
            resourceList: [{
                    name: '专家',
                    num: '10',
                },
                {
                    name: '指挥员',
                    num: '10',
                }
            ],
            desc: '1111111111111111111',
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB'
    }, {
        from: 'nodeB',
        to: 'nodeC'
    }, {
        from: 'nodeC',
        to: 'nodeD'
    }]
}

export function getDataA() {
    return data_A
}