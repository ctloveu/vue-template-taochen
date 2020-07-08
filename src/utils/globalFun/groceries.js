module.exports = {
    //nextTick flag改变 fn回调封装
    nextTickTrue: function (flag, fn) {
        this[flag] = false;
        this.$nextTick(() => {
            this[flag] = true;
            setTimeout(() => {
                fn();
            }, 10);
        });
    },
    //Echarts图表自适应
    autoResizeEcharts: (chart) => {
        window.addEventListener("resize", function () {
            chart.resize()
        });
    },
    //draw Echart图标并自动监听浏览器窗口变化大小自适应
    drawEcharts: function (id, option) {
        const _this = this;
        if (_this.echart) {
            _this.echart.dispose();
        }
        _this.echart = this.$echarts.init(
            document.getElementById(id)
        );
        _this.echart.setOption(option);
        window.addEventListener("resize", function () {
            _this.echart.resize()
        });
    },
    /*
     *setPermissions函数,当权限列表统一
     */
    hasPermission: (permissionName) => {
        if (!permissionName) {
            return true;
        }
        if (localStorage.getItem('permissions')) {
            let permissions = JSON.parse(localStorage.getItem('permissions'))
            if (permissions.indexOf(permissionName) > -1) {
                return true
            }
        }
        return false
    },
    //下载图片
    download: (url, name) => {
        let image = new Image();
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
        image.onload = () => {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            canvas.toBlob(blob => {
                let urlBlob = URL.createObjectURL(blob);
                //创建a标签下载
                let aLink = document.createElement("a");
                aLink.download = name;
                aLink.href = urlBlob;
                aLink.target = '_blank';
                aLink.click();
                aLink.remove();
                // 用完释放URL对象
                URL.revokeObjectURL(urlBlob);
            });
        };
    }
}