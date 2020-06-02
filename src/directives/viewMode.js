export default function bind(el, binding, vnode, oldVnode) {
    setTimeout(() => {
        let className = $(el).attr("class");
        let flag = className.indexOf('view') > -1;
        if (flag) {
            let inputs = $(el).find('input');
            let textareas = $(el).find('textarea');
            let selects = $(el).find('select');
            for (let i = 0; i < inputs.length; i++) {
                $(inputs[i]).attr('disabled', true);
            }
            for (let i = 0; i < textareas.length; i++) {
                $(textareas[i]).attr('disabled', true);
            }
            for (let i = 0; i < selects.length; i++) {
                $(selects[i]).attr('disabled', true);
            }
        }
    }, 100)
}