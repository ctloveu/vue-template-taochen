import { title as AppTitle } from '@/settings'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
    // 获取titile的值，然后重新赋值title的值
    getPageTitle: (pageTitle) => {
        const title = AppTitle;
        if (pageTitle) {
            return `${pageTitle} - ${title}`
        }
        return `${title}`
    },
    // 获取数组的唯一主键
    getIds: (dataList, id) => {
        let key = id || 'id';
        let ids = [];
        dataList.forEach(element => {
            ids.push(element[key]);
        });
        return ids.join(',')
    },
    // keyInfos格式{"khzbXxlbmc":[{key:1,value:'张三'}],"kk":[{key:1,value:'张三'}]}
    keyJoinValue: (dataList, keyInfos) => {
        let maps = {};
        for (let key in keyInfos) {
            maps[key] = {};
            let keyArray = keyInfos[key];
            keyArray.forEach(element => {
                maps[key][element['key']] = element['value'];
            })
        }
        dataList.forEach(data => {
            for (let attr in maps) {
                let map = maps[attr];
                data[attr + 'Name'] = map[data[attr]];
            }
        });
        return dataList;
    },
    //获取session或者localStorage
    getStorage: (v, t) => {
        return t == 'session' ?
            sessionStorage.getItem(v) ? JSON.parse(sessionStorage.getItem(v)) : false :
            localStorage.getItem(v) ? JSON.parse(localStorage.getItem(v)) : false
    },
    getPdf: (title, selector) => {
        html2Canvas(document.querySelector(selector), {
            allowTaint: true
        }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight
                    position -= 841.89
                    if (leftHeight > 0) {
                        PDF.addPage()
                    }
                }
            }
            PDF.save(title + '.pdf')
        })
    }
}