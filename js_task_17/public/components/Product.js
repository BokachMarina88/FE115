import GeneralComponent from "./GeneralCompanent";

class Product extends GeneralComponent {

 init() {
  return this.create('div', [{label: 'class', value: 'product_page'}], `<h1>Product Page</h1>`);
 }
}

export default new Product().init();