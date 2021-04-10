<template>
  <div style="height: 2000px;">
      <el-input v-model="val" @input="valChange"></el-input>
      <div class="box" @click="boxClick"></div>
      <!-- <input v-model.lazy="msg" />
      <el-input v-model.lazy="msg" @change="inputChange(msg)" />
      <div>{{msg}}</div>
      <div>{{num}}:{{msg}}</div> -->
      <receipt />
      <!-- <receipt2 /> -->
      <!-- <img :src="url" alt="" srcset=""> -->
      <div class="main">
          <div class="child"></div>
          <!-- <div class="child2"></div> -->
      </div>
      <div>wrwrweerwe</div>
  </div>
</template>

<script>
import receipt from './receipt.vue'
import receipt2 from './receipt2.vue'
import debounce from '@library/function/debounce'
import throttle from '@library/function/throttle'
import { conunt, testObj} from './dataEsModule.js'

let countCommon = require('./dataCommon.js').countCommon 
let commonObj = require('./dataCommon.js').commonObj
export default {
    components: { receipt, receipt2 },
    data() {
        return {
            msg: '',
            num: 0,
            val: ''
        }
    },
    mounted() {
        console.log(conunt)
        console.log(testObj)

        console.log('countCommon', countCommon)
        console.log('commonObj', commonObj)
        // console.log(this.url)
        const arr = [
            {
                parentId: 0,
                id: 1,
                name: '2312213'
            },
            {
                parentId: 1,
                id: 23,
                name: '3dgdf'
            },
            {
                parentId: 0,
                id: 234,
                name: 'dfasd34'
            },
            {
                parentId: 4,
                id: 234234,
                name: '2312213'
            },
            {
                parentId: 23,
                id: 2,
                name: 'sdfa222'
            },
            {
                parentId: 2,
                id: 112321312,
                name: 'vsdvb'
            },
            {
                parentId: 0,
                id: 4,
                name: '2312213'
            },
            {
                parentId: 0,
                id: 5,
                name: '2312213'
            },
            {
                parentId: 5,
                id: 3432,
                name: '2312213'
            },
        ]

        this.valChange = debounce(this.valChange, 1000)
        this.boxClick = throttle(this.boxClick, 2000)
    },
    methods: {
        valChange() {
            console.log(325235)
        },
        boxClick() {
            console.log('1s只执行一次')
        },
        inputChange(v) {
            this.num++
        },
        translateDataToTree(data, config) {
            const { pId = 'pId', id = 'id', children = 'children' } = config
            let parents = data.filter(v => [undefined, null, 'undefined', 0].includes(v[pId]))
            let childrens = data.filter(v => ![undefined, null, 'undefined', 0].includes(v[pId]))

            const translator = (parents, childrens) => {
                parents.forEach(p => {
                    childrens.forEach((cur, index) => {
                        if (cur[pId] === p[id]) {
                            let temp = JSON.parse(JSON.stringify(childrens))
                            temp.splice(index, 1)

                            translator([cur], temp)

                            typeof p[children] !== 'undefined' ? p[children].push(cur) : p[children] = [cur]
                        }
                    })
                })
            }
            translator(parents, childrens)
            return parents
        },
        toTree(data, config) {
            const { pId = 'pId', id = 'id', children = 'children' } = config
            let obj = {}, // 使用对象重新存储数据
                arr = [] // 存储最后结果
            
            // 遍历原始数据data，构造obj数据，键名为id，值为数据
            for (let i = 0; i < data.length; i++) {
                obj[data[i][id]] = data[i]
            }
            // 遍历原始数据
            for (let i = 0; i < data.length; i++) {
                const node = data[i]
                // 通过每条数据的 pid 去obj中查询
                let pNode = obj[node[pId]]
            
                if (pNode) {
                    // 根据 pid 找到的是父节点，node是子节点，
                    if (!pNode[children]) {
                        pNode[children] = []
                    }
                    // 将子节点插入 父节点的 children 字段中
                    pNode[children].push(node)
                } else {
                    // pid 找不到对应值，说明是根结点，直接插到根数组中
                    arr.push(node)
                }
            }
            return arr
        }
    }
}
</script>

<style scoped>
.main{
    width: 500px;
    height: 300px;
    padding: 10px 10px;
    margin: 10px 10px;
    border: solid 1px red;
    /* 
        标准盒子模型
        width = content
     */
    /* box-sizing: content-box; */
    /* 
        IE盒子模型
        width = content+padding+border
    */
    /* box-sizing: border-box; */
}
.child{
    width: 80%;
    height: 100%;
    /* margin: 0 auto; */
    /* padding: 20px 20px; */
    /* margin: 30px 20px; */
    margin-bottom: 30px;
    border: solid 1px red;
}
/* .child2{
    width: 100%;
    height: 100%;
    border: solid 1px red;
} */
.box{
    width: 100px;
    height: 100px;
    background: red;
    cursor: pointer;
}
</style>