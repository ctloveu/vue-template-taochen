<template>
		<div class="receipt-main">
			<div class="receipt-body">
				<div class="receipt-title">
					<div class="receipt-div1">
						<div class="receipt-divCtn">
							<div class="receipt-titleCtn">收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;据</div>
							<div class="receipt-titleUdeLine"></div>
						</div>
					</div>
					<div class="receipt-div2">NO：<span style="color: #9C5223;">2396827</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
				</div>
				<div class="receipt-date">
					<div class="receipt-deDiv1">2020年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;04月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21日</div>
					<!-- <div class="deDiv2">第&nbsp;&nbsp;&nbsp;&nbsp;200&nbsp;&nbsp;&nbsp;&nbsp;号</div> -->
				</div>
				<table class="receipt-table-0" border="1" style="width: 100%; border-collapse: collapse;">
					<tr class="receipt-tempTr2">
						<td colspan="13" style="border-right-color: #FFFFFF; text-align: left;">&nbsp;&nbsp;今&nbsp;&nbsp;收&nbsp;&nbsp;到&nbsp;&nbsp; {{name}}</td>
					</tr>
					<tr>
						<td align="center" rowspan="2" style="width: 60%;">摘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要</td>
						<td colspan="10" align="center" style="width: 10%;">金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额</td>
						<td rowspan="2" align="center" style="width: 30%;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</td>
					</tr>
					<tr class="receipt-tempTr1">
						<td>￥</td>
						<td>百</td>
						<td>十</td>
						<td>万</td>
						<td>千</td>
						<td>百</td>
						<td>十</td>
						<td>元</td>
						<td>角</td>
						<td>分</td>
					</tr>
					<tr class="receipt-tempTr2">
						<td>考试费用</td>
						<td>￥</td>
						<td v-for="(v, key) in moenyToStr(moeny)" :key="key">
                            {{v}}
                        </td>
						<td>支付方式：现金</td>
					</tr>
					<tr class="receipt-tempTr2">
						<td></td>
						<td>￥</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr class="receipt-tempTr2">
						<td></td>
						<td>￥</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr class="receipt-tempTr2">
						<td colspan="12" style=" text-align: left;">
							合计人民币（大写）:{{moneyToCN(moeny)}}
							<div style="float: right; display: flex;"><div style="font-size: 20px;">￥：</div><div style="min-width: 180px; height: 30px; border-bottom: solid #000000 1px; text-align: center;">{{moeny}}</div></div>
						</td>
					</tr>
				</table>
				<div style="width: 100%; height: 40px;">
					<div style="max-width: 50%; height: 40px; line-height: 40px;float: right;margin-right: 36px;">收款人：</div>
				</div>
			</div>
		</div>

</template>

<script>
export default {
    data() {
        return {
            name: '董润文',
            moeny: 9950.50,
            // moeny: 1212232312.23,
        }
    },
    computed: {
        
    },
    methods: {
        /**
         * 把金额转为发票、收据等表格能遍历显示的数据
         * 
         * @param {money} Numner 金额大小
         * @param {max} Numner 带(角、分的位数)
         * 例：百	十	万	千	百	十	元	角	分为9位
         */
        moenyToStr(money, max = 9) {
            // NaN !== NaN
            if (Number(money) !== Number(money)) {
                return money
            }
            // 转为字符串
            let str = String(money)
            // 分割为数组，去掉小数点
            const parts = str.split('.')
            str = parts.join('')
            // 不足两位小数添0
            str = str.padEnd(parts[0].length + 2, '0')

            // 大于最大位数
            if (str.length > max) {
                return ''.padStart(max, '9')
                // return Array.from({length: max}, (x, i) => {
                //     return 9
                // })
            }
            // 不足位数补空
            str = str.padStart(max, ' ')
            return str
        },
        moneyToCN(money) {
            // NaN !== NaN
            if (Number(money) !== Number(money)) {
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

    }
}
</script>

<style lang="scss" scoped>
.receipt-main{width: 960px; height: 480px; margin: 0px auto; margin-top: 20px; padding: 10px; display: flex;}
.receipt-body{width: 100%; height: 480px;}
.title{width: 100%; height: 40px; display: flex;}
.receipt-title .receipt-div1{width: 60%; text-align: right;}
.receipt-title .receipt-div1 .receipt-divCtn{width: 230px; height: 40px; float: right;}
.receipt-title .receipt-div1 .receipt-divCtn .receipt-titleCtn{width: 230px; height: 30px; line-height: 30px;text-align: center; font-size: 25px; font-weight: bold;}
.receipt-title .receipt-div1 .receipt-divCtn .receipt-titleUdeLine{width: 230px; height: 6px; border-bottom: solid 2px #9C5223; border-top: solid 2px #9C5223;}
.receipt-title .receipt-div2{width: 40%; text-align: right; height: 40px; line-height: 30px; font-size: 20px; font-weight: bold;}
.receipt-date{width: 100%; height: 40px; display: flex;}
.receipt-date .receipt-deDiv1{width: 60%; height: 40px; line-height: 40px; text-align: right; font-size: 18px;}
.receipt-date .receipt-deDiv2{width: 40%; height: 40px;line-height: 40px;  text-align: right;font-size: 18px;}
.receipt-tempTr1 td{text-align: center;}
.receipt-table-0 tr td{padding: 5px;}
.receipt-tempTr2 td{height: 40px; text-align: center;}
// .receipt-end{width: 5%; height: 480px; }
</style>