import {create} from "./RenderData";

function Cart() {
 this.title = 'Cart';

 this.init = () => {
  console.log("rendCarter");
  return this.render();
 }
 this.render = () => {

  let page = create('div', [{label: 'class', value: 'cart_page'}], `<h1,Cart Page</h1>`);

  return page;
 }
}

let cart = new Cart();
let title = cart.title;

export default cart;
export {title};
