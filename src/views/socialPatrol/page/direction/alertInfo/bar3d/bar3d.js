
var configAll = {
    print: {
        nameTextStyle: "#000",
        lineStyle: "#000",
        textStyle: "#000"
    },
    normal: {
        nameTextStyle: "#fff",
        lineStyle: "#b1d2ec",
        textStyle: "#fff"
    }
}
var days = ['星期一', '星期二', '星期三',
    '星期四', '星期五', '星期六', '星期日'
];
var hours = ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市',
    '孝感市', '荆州市', '黄冈市'
];

// var temp = [
//     21	26	34	21	11	12	17
//     35	51	16	19	12	23	28
//     15	32	12	18	15	8	10
//     ]

var data = [
    [0, 0, 58],
    [1, 0, 34],
    [2, 0, 12],
    [3, 0, 20],
    [4, 0, 12],
    [5, 0, 46],
    [6, 0, 28],

    [0, 1, 48],
    [1, 1, 24],
    [2, 1, 32],
    [3, 1, 24],
    [4, 1, 17],
    [5, 1, 36],
    [6, 1, 19],

    [0, 2, 38],
    [1, 2, 37],
    [2, 2, 32],
    [3, 2, 23],
    [4, 2, 29],
    [5, 2, 33],
    [6, 2, 1],

    [0, 3, 23],
    [1, 3, 14],
    [2, 3, 32],
    [3, 3, 18],
    [4, 3, 15],
    [5, 3, 36],
    [6, 3, 38],

    [0, 4, 36],
    [1, 4, 37],
    [2, 4, 31],
    [3, 4, 26],
    [4, 4, 13],
    [5, 4, 26],
    [6, 4, 25],

    [0, 5, 51],
    [1, 5, 26],
    [2, 5, 26],
    [3, 5, 25],
    [4, 5, 18],
    [5, 5, 43],
    [6, 5, 9],

    [0, 6, 24],
    [1, 6, 14],
    [2, 6, 18],
    [3, 6, 18],
    [4, 6, 22],
    [5, 6, 28],
    [6, 6, 31],

    [0, 7, 53],
    [1, 7, 27],
    [2, 7, 24],
    [3, 7, 32],
    [4, 7, 19],
    [5, 7, 22],
    [6, 7, 7],
    [0, 8, 25],
    [1, 8, 51],
    [2, 8, 35],
    [3, 8, 15],
    [4, 8, 23],
    [5, 8, 34],
    [6, 8, 19],

    [0, 9, 36],
    [1, 9, 38],
    [2, 9, 11],
    [3, 9, 14],
    [4, 9, 16],
    [5, 9, 32],
    [6, 9, 32],
];

const  getOption3d = async function (obj) {
    let { type } = obj;
    var config = configAll[type];
    var option3d = {
        tooltip: {
            formatter: function (param) {
                var values = param.value;
                return hours[values[0]] + days[values[1]] + values[2]
            }
        },
        visualMap: {
            show: false,
            max: 20,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        xAxis3D: {
            type: 'category',
            data: hours,
            axisLabel: {
                textStyle: {
                    color: config.textStyle
                },
                rotate: obj.rotate || 0
            },
            nameTextStyle: {
                color: config.nameTextStyle
            },
            axisLine: {
                lineStyle: {
                    color: config.lineStyle
                }
            }
        },
        yAxis3D: {
            type: 'category',
            data: days,
            nameTextStyle: {
                color: config.nameTextStyle
            },
            axisLine: {
                lineStyle: {
                    color: config.lineStyle
                }
            },
            axisLabel: {
                textStyle: {
                    color: config.textStyle
                }
            },
        },
        zAxis3D: {
            type: 'value',
            nameTextStyle: {
                color: config.nameTextStyle
            },
            axisLine: {
                lineStyle: {
                    color: config.lineStyle
                }
            },
            axisLabel: {
                textStyle: {
                    color: config.textStyle
                }
            },
        },
        grid3D: {
            boxWidth: 160,
            boxHeight: 80,
            boxDepth: 64,
            viewControl: {
                // projection: 'orthographic'
            },
            top: -50,
            bottom: 5,
            right: 5,
            left: 5,
            axisLabel: {
                textStyle: {
                    color: "#fff"
                }
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: true
                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [{
            type: 'bar3D',
            data: data.map(function (item) {
                return {
                    value: [item[1], item[0], item[2]],
                }
            }),
            shading: 'lambert',

            label: {
                show: false,
                textStyle: {
                    fontSize: 0,
                    borderWidth: 1,
                    color: "#fff"
                },

            },

            emphasis: {
                label: {
                    show: false,
                    textStyle: {
                        fontSize: 20,
                        color: '#900'
                    }
                },
                itemStyle: {
                    color: '#900'
                }
            }
        }]
    }
    return option3d;
}

export {
    getOption3d
}
