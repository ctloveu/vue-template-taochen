<template>
    <div>
        测试common.js和Es Module输出值

        common.js属于值的浅拷贝
        Es Module属于值的引用
    </div>
</template>

<script>
import { conunt, testObj} from './dataEsModule.js'
// 基本类型数据不能被改变，属于值的引用
// conunt++
testObj.a = 9 // 这里改变，其它组件引用的地方也会改变

let countCommon = require('./dataCommon.js').countCommon
let commonObj = require('./dataCommon.js').commonObj

countCommon++ // 这里改变，不会影响其它地方使用，因为其它地方使用会去dataCommon重新拷贝countCommon
commonObj.a = 300 // 这里改变，会影响其它地方使用，因为是值的浅拷贝，实际在内存中还是指向了一个地方
export default {
    mounted() {
        console.log(conunt)
        console.log(testObj)

        console.log('countCommon', countCommon)
        console.log('commonObj', commonObj)
    }
}
</script>