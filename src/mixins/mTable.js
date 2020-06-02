//表格相关公共方法
const mTable = {
    data() {
        return {
            dataList: [],
            tableHeight: 0,
            selectedList: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            ismore: false
        }
    },
    methods: {
        //分页数改变
        pageSizeChange(val) {
            this.pageSize = val;
            this.query();
        },
        //翻页改变
        pageChange(val) {
            this.currentPage = val;
            this.query();
        },
       
        //checkbox勾选改变
        selectionChange(val) {
            this.selectedList = val;
        },
        setHeight(refTable, refCondition) {
            this.$nextTick(function() {
                this.tableHeight =
                    this.$refs[refTable]["offsetHeight"] -
                    this.$refs[refCondition]["offsetHeight"] -
                    60;
            });
        },
        //条件更多
        more(refTable, refCondition) {
            this.ismore = !this.ismore;
            setTimeout(() => {
                this.setHeight(refTable, refCondition);
            }, 500);
        },
        //将对象内属性置为空
        resetObject(obj) {
            for (let attr in obj) {
                obj[attr] = "";
            }
            return obj;
        }
    }
}
export default mTable
