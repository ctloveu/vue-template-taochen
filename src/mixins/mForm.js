const mForm = {
    methods: {
        checkRequiredFields(form) {
            let From = $(form);
            let conditionList = From.find('.condition');
            for (let i = 0; i < conditionList.length; i++) {
                let condition = conditionList[i];
                let itemList = $(condition).find('.item');
                for (let j = 0; j < itemList.length; j++) {
                    let item = itemList[j];
                    let className = $(item).find('label').attr('class');
                    if (className && className.indexOf('required') > -1) {
                        let label = $($(item).children()[0]).html();
                        // 按照冒号对label进行分割
                        label = label.split('：')[0];
                        let value = $($(item).children()[1]).val();
                        if (!value) {
                            this.$message.error(label + '输入不合法');
                            return false;
                        }
                    }
                }
            }
        },
    }
}
export default mForm