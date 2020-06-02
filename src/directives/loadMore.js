export default function bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
        this.loadSign = typeof this.loadSign == "boolean" ? this.loadSign : true;
        if (this.loadSign) {
            this.loadSign = false;
            let sign = 10
            const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
            if (scrollDistance <= sign) {
                binding.value()
            }
            setTimeout(() => {
                this.loadSign = true;
            }, 10);
        }
    })
}