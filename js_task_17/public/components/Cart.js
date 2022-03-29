import GeneralComponent from "./GeneralCompanent";

class Cart extends GeneralComponent {

 init() {
  return this.create('div', [{label: 'class', value: 'cart_page'}], `<h1>Cart Page</h1>`);
 }
}

export default new Cart().init();
