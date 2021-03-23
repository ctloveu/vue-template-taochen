<template>
  <div>
      <!-- <input v-model.lazy="msg" />
      <el-input v-model.lazy="msg" @change="inputChange(msg)" />
      <div>{{msg}}</div>
      <div>{{num}}:{{msg}}</div> -->
      <!-- <receipt /> -->
      <receipt2 />
      <!-- <img :src="url" alt="" srcset=""> -->
  </div>
</template>

<script>
import receipt from './receipt.vue'
import receipt2 from './receipt2.vue'

export default {
    components: { receipt, receipt2 },
    data() {
        return {
            msg: '',
            num: 0,
        }
    },
    mounted() {
        console.log(this.url)
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
        // const data = this.translateDataToTree(arr, {
        //     pId: 'parentId'
        // })
        // console.log(data)

        function deepClone(obj) {
            let result
            const type = isClass(obj)
            if (type === 'Object') {
                result = {}
            } else if (type === 'Array') {
                result = []
            } else {
                return obj
            }
            
            for(let key in obj) {
                const val = obj[key]
                if(['Object', 'Array'].includes(isClass(val))) {
                    // 在严格模式下，禁止使用该种办法
                    // result[key] = arguments.callee(val) //递归
                    result[key] = deepClone(val)
                } else {
                    result[key] = val
                }
            }
            return result
        }

        //判断对象类型
        function isClass(obj) {
            // Object.prototype.toString.call(obj) [object '类型']
            return Object.prototype.toString.call(obj).slice(8, -1)
        }

        console.log(deepClone(arr))

    },
    methods: {
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

<style>

</style>