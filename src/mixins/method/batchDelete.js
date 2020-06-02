import { Message } from "element-ui";
/*
批量删除
@data type:Array 已选择数据
@id data一条数据的唯一标识字段 默认'id'
*/

export default {
    methods: {
        batchDelete(data, fn) {
            if (data.length > 0) {
                this.$confirm("您确定删除嘛?", "删除", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    customClass: "message-box-kj2"
                }).then(() => {
                    fn();
                });
            } else {
                Message.closeAll()
                this.$message({
                    message: "请选择数据!",
                    type: "warning"
                });
            }
        }
    }
}