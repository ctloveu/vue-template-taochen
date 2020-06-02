import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default function bind(el, binding, vnode, oldVnode) {
    const viewer = new Viewer(el, {});
}
