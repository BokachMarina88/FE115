import {create} from "./RenderData";

function Product() {

 this.init = () => {
  return create('div', [{label: 'class', value: 'product_page'}], `<h1>Product Page</h1>`);
 }
}

export default new Product().init();