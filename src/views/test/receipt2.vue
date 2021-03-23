<template>
<div class="receipt-main">
    <div class="receipt-main-simple">
        <div class="receipt-body">
            <div class="receipt-title">
                <div class="receipt-div1">
                    <div class="receipt-divCtn">
                        <div class="receipt-titleCtn">
                            <span>收</span>
                            <span>款</span>
                            <span>收</span>
                            <span>据</span>
                        </div>
                        <div class="receipt-titleUdeLine"></div>
                    </div>
                </div>
                <div class="receipt-div2">No.<span>{{data.no}}</span></div>
            </div>
            <div class="receipt-date">
                <div class="receipt-deDiv1">日期：{{timeShow(data.createTime)}}</div>
            </div>
            <div class="receipt-table">
                <div class="receipt-table-tr">
                    <div class="receipt-table-td1">
                        <span>今</span>
                        <span>收</span>
                        <span>到</span>
                    </div>
                    <div class="receipt-table-td2" style="width: calc(100% - 3.6rem);">&nbsp;&nbsp;{{data.studentName}}</div>
                </div>
                <div class="receipt-table-tr">
                    <div class="receipt-table-td1">
                        <span>人</span>
                        <span>民</span>
                        <span>币</span>
                    </div>
                    <div class="receipt-table-td3" style="width: 3.6rem;">（大写）</div>
                    <div class="receipt-table-td2" style="width: calc(60% - 4.1rem);">&nbsp;&nbsp;{{data.cashCapital}}</div>
                    <div class="receipt-table-td4" style="width: 1rem;">￥</div>
                    <div class="receipt-table-td2" style="width: calc(40% - 4.1rem);">&nbsp;&nbsp;{{data.amount}}</div>
                </div>
                <div class="receipt-table-tr">
                    <div class="receipt-table-td1">
                        <span>收</span>
                        <span>款</span>
                        <span>明</span>
                        <span>细</span>
                    </div>
                    <div class="receipt-table-td2" style="width: calc(100% - 3.6rem);">&nbsp;&nbsp;{{paymentDetailShow(data.paymentDetails)}}</div>
                </div>
                <div class="receipt-table-tr-bottom">
                    收款单位（公章）：
                </div>
            </div>
            <div style="width: 100%;">
                <div class="receipt-receiver">收款人：{{data.receiver}}</div>
            </div>
        </div>
        <div class="end"><div style="margin-top: 6rem; text-align: center; height: 10rem;width: 100%;">第<br/>一<br/>联<br/>：<br/>客<br/>户</div></div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    name: '董润文',
                    moeny: 9950.50,
                    reciver: '曲艳君',
                }
            }
        }
    },
    methods: {
        /**
         * 把金额转为发票、收据等表格能遍历显示的数据
         * @param {money} number 金额大小
         * @param {max} mumber 带(角、分的位数)
         * 例：百十万千百十元角分为9位
         */
        moenyToStr(money, max = 9) {
            // NaN !== NaN

            if (isNaN(Number(money))) {
                return money
            }
            // 转为字符串
            let str = String(money)
            // 分割为数组
            const parts = str.split('.')
            // 小数部分
            const decimalPart = parts[1] ? parts[1].length : 0
            // 不足两位小数添0
            str += '00'.slice(0, 2 - decimalPart)
            // 去掉小数点
            str = str.split('.').join('')

            const l = str.length
            // 大于
            if (l > max) {
                return Array.from({ length: max }, (x, i) => {
                    // return i === 0 ? 1 : 0
                    return 9
                })
            }
            // 需添加空字符个数
            const s = l % max
            const stringNull = Array.from({ length: max }, () => ' ').join('')
            str = stringNull.slice(0, max - s) + str
            return str
        },
        moneyToCN(money) {
            // NaN !== NaN
            if (isNaN(Number(money))) {
                return money
            }
            // 大数位，每四位一节
            const cnFigure = ['', '万', '亿', '万亿']
            // 中文数字0-9
            const cnInteger = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
            // 十进制计数“个十百千”
            const cnDecimalism = ['', '拾', '佰', '仟']
            // 先转为字符串
            const string = String(money)
            // 小数点分割
            const numbers = string.split('.')
            const integerPart = numbers[0]
            const decimalPart = numbers[1]
            // 整数部分位数
            const l = integerPart.length
            // 四位分节
            const pitch = Math.ceil(l / 4)
            const array = []
            // 分为每四位一节，从低位向高位分
            for (let index = 0; index < pitch; index++) {
                array.push(integerPart.slice((l - (index + 1) * 4 < 0) ? 0 : (l - (index + 1) * 4), l - index * 4))
            }
            // 将四位一节的数字转换为对应的中文，拼接上大数位，比如（一千一百一十一）（万），“一千一百一十一万”
            const cnArray = array.map((figure, index) => {
                const cn = figure.split('').map((char, i) => {
                    return char === '0' ? '零' : (cnInteger[Number(char)] + cnDecimalism[figure.length - i - 1])
                    // replace末尾的所有“零”，例如“壹仟零零零”变成“壹仟”；再replace中间的多个零，例如“壹万零零零玖”变成“壹万零玖”
                }).join('').replace(/\u96f6+$/, '').replace(/\u96f6+/g, '\u96f6')
                // 防止出现“零零零零”变成“”之后再加大数位，例如“（零零零零）万”变成“万”
                return cn.length ? (cn + cnFigure[index]) : (cnFigure[index] ? '零' : '')
            }).reverse()
            // 整数，替换掉中间连续的“零”，例如“一万亿零（亿）零（万）一千”变为“一万亿零一千”，最后可加上.replace(/^\u4e00\u5341/, '\u5341')，将“一十****”变为“十****”
            const integerCN = cnArray.join('').replace(/\u96f6+/g, '\u96f6')

            let decimalCN = ''
            if (!decimalPart || decimalPart === '0' || decimalPart === '00') {
                decimalCN = '整'
            } else {
                const [p0, p1] = decimalPart.split('')
                decimalCN = (p0 === '0' ? '零' : (cnInteger[Number(p0)] + '角')) + (!p1 || p1 === '0' ? '' : (cnInteger[Number(p1)] + '分'))
            }

            return `${integerCN || '零'}圆${decimalCN}`
        },
        paymentDetailShow(arr) {
            if (arr && arr.length > 0) {
                arr.forEach(element => {
                    element.split('：').join('￥')
                })
                return arr.join('、')
            }
            return ''
        },
        timeShow(time) {
            if (!time) {
                return ''
            }
            const times = this.$options.filters.formatDate(time, 'yyyy-MM-dd')
            if (times) {
                const arr = times.split('-')
                if (arr.length === 3) {
                    return `${arr[0]}年${arr[1]}月${arr[2]}日`
                }
            }
            return ''
        }

    }
}
</script>

<style lang="scss" scoped>
.receipt-body{
    width: 100%;
}
.receipt-main {
    // width: 80%;
    width: 24rem;
    // margin: 0 auto;
    transform: rotate(-270deg) translateX(5rem);
}
.receipt-main-simple{
    width: 100%;
    // width: 48.5rem;
    // height: 24.375rem;
    margin: 0px auto;
    padding: 0.2rem 0.5rem;
    display: flex;
    background: rgba(255, 203, 227, 1);
    box-sizing: border-box;
    background-image: url('http://htwuhan.oss-cn-beijing.aliyuncs.com/tool/sku-htgz@2x+(1).png');
    background-repeat: no-repeat;
    background-size: 20%;
    background-repeat: no-repeat;
    background-position-x: calc(100% - 5rem);
    background-position-y: calc(100% - 1rem);
    font-family: STSongti-SC-Bold, STSongti-SC;

    .receipt-title{
        position: relative;
    }

    .receipt-div1{
        overflow: hidden;
        width: 100%;
        text-align: center;
        .receipt-divCtn{
            width: 24%;
            margin: 0  auto;

            .receipt-titleCtn{
                font-size: 1rem;
                font-weight: bold;
                color: #333;
                line-height: 1.5rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .receipt-titleUdeLine{
                height: 4px;
                width: 98%;
                border-bottom: solid 1px #333;
                border-top: solid 1px #333;
                margin: 0 auto;
                margin-top: 3px;
            }

        }
    }
    .receipt-div2{
        position: absolute;
        right: 0;
        top: 0;
        line-height: 2.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: #333333;
        span{
            color: #F5222D;
            font-weight: 400;
        }
    }

    .receipt-date{
        width: 100%;
        line-height: 1.5rem;
        text-align: center;
        // margin-top: 0.3rem;
        .receipt-deDiv1{
            font-size: 0.8rem;
            font-weight: bold;
            color: #333333;
        }
    }

    .receipt-table{
        // width: 680px;
        width: 100%;
        border: 1px solid #000000;
        margin-top: 4px;
        padding: 0.5rem 0.48rem;
        padding-bottom: 4px;
        box-sizing: border-box;

        .receipt-table-tr{
            display: flex;
            .receipt-table-td1{
                width: 3.6rem;
                line-height: 2.5rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
                font-weight: bold;
                color: #333333;
            }
            .receipt-table-td2{
                border-bottom: solid #333 1px;
                height: 1.625rem;
                line-height: 2.5rem;
                font-size: 0.8rem;
                font-weight: bold;
                color: #333333;
            }
            .receipt-table-td3{
                font-size: 0.8rem;
                // width: 12rem;
                line-height: 2.5rem;
            }
            .receipt-table-td4{
                line-height: 2.5rem;
                font-size: 0.8rem;
                font-weight: bold;
                color: #333333;
            }
        }

        .receipt-table-tr+.receipt-table-tr{
            margin-top: 0.2rem;
        }

        .receipt-table-tr-bottom{
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: right;
            padding-right: 20%;
            font-size: 0.6rem;
            font-weight: 400;
            color: #333333;
        }
    }

    .receipt-receiver{
        float: right;
        height: 2rem;
        line-height: 2rem;
        padding-right: 3rem;
        font-size: 0.8rem;
        font-weight: 400;
        color: #333333;
    }

    .end{
        width: 1.5rem;
        height: 10rem;
        font-size: 0.8rem;
    }
}
</style>