import {create} from "./RenderData";

function Head() {

 this.init = () => {
  return create('header', [{label: 'class', value: 'header'}]);
 }
}

export default new Head().init();