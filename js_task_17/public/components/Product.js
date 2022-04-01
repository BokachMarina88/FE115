import {create} from "./RenderData";

function Product() {
 this.title = 'Product';

 this.init = () => {
  return create('div', [{label: 'class', value: 'product_page'}], `<h1>Product Page</h1>`);
 }
}

let elem = new Product();
let init = elem.init();
let title = elem.title;

export default init;
export {title};