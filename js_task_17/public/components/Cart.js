import {create} from "./RenderData";

function Cart() {

 this.init = () => {
  return create('div', [{label: 'class', value: 'cart_page'}], `<h1>Cart Page</h1>`);
 }
}

export default new Cart().init();
