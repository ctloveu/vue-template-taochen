import echarts from 'echarts';
var uploadedDataURL = "/json/hubei.json";
var middle1 = null;
var configAll = {
    print: {
        visualMap_color: "#000",
    },
    normal: {
        visualMap_color: "#fff",

    }

}
const getOptionMiddle1 = function (obj) {
    let { id, type,data } = obj;
    var config = configAll[type];
    $.ajax({
        type: "get",
        url: uploadedDataURL,
        contentType: "application/json", //必须有  
        dataType: "json", //表示返回值类型，不必须  
        success: function (geoJson) {
            echarts.registerMap('jiangxi', geoJson);
            var option = {
                visualMap: {
                    type: 'piecewise',
                    splitNumber: 4,
                    top: 10,
                    right: 10,
                    orient: "horizontal",
                    pieces: [{
                        value: 1,
                        label: '一级',
                        color: '#F60B0B',


                    }, {
                        value: 2,
                        label: '二级',
                        color: '#fc9d04'
                    },

                    {
                        value: 3,
                        label: '三级',
                        color: '#ffff00'
                    }, {
                        value: 4,
                        label: '四级',
                        color: '#059c53'
                    }
                    ],
                    textStyle: {
                        color: config.visualMap_color
                    }


                },
                tooltip: {
                    trigger: 'item',
                    //点击触发
                    triggerOn: 'click',
                    formatter: function (params) {
                        var tipHtml = '';
                        tipHtml = '<div style="width:280px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
                            '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' +
                            '<span style="color:#fff;font-size:16px;">' + params.name + '</span>' + '</div>' +
                            '<div stsyle="padding:20px">' +
                            '<div style="color:#fff;font-size:12px;margin:4px 0 4px 10px;">' +
                            '数量：' + '<span style="color:#f48225;margin:4px 0 4px 10px;">' + '</span>' + params.data.ajsl + '</div>' +
                            '<div style="color:#fff;font-size:12px;margin:4px 0 4px 10px;">' +
                            '区域常态值：' + '<span style="color:#f4e925;margin:0 2px;">' + '</span>' + params.data.qyctz + '</div>' +
                            '<div style="color:#fff;font-size:12px;margin:4px 0 4px 10px;">' +
                            '预警级别：' + '<span style="color:#25f4f2;margin:0 2px;">' + '</span>' + params.data.yjjb + '</div>' +
                            '</div>' + '</div>';

                        return tipHtml;
                    }
                },
                series: [{
                    type: 'map',
                    name: '省份分析',
                    //需要提前引入china.js
                    map: 'jiangxi',
                    //单多选 默认false
                    selectedMode: false,
                    label: {
                        normal: {
                            show: true,
                            color: "#baddff"
                        },
                        //默认false
                        emphasis: {
                            color: "#baddff"
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'blue',
                            areaColor: '#40a9ed',
                            shadowColor: '#008fe0',
                            shadowBlur: 10,
                        },
                        emphasis: {
                            areaColor: '#fff464',
                            borderWidth: 0
                        }
                    },
                    //数据
                    data: data

                }]
            };
            if (middle1) {
                middle1.dispose();
            }
            middle1 = echarts.init(document.getElementById(id));
            middle1.setOption(option);
        }
    });

}
export {
    getOptionMiddle1
}