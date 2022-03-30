import {create} from "./RenderData";

function Footer() {

 this.init = () => {
  return create('footer', [{label: 'class', value: 'footer'}]);
 }
}

export default new Footer().init();

