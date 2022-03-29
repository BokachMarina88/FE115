import GeneralComponent from "./GeneralCompanent";
import createField from "./RenderData";

class Nav extends GeneralComponent {
 constructor() {
  super();
  this.data;
 }

 init() {
  let element = this.create('nav', [{label: 'class', value: 'nav'}]);

  let divList = this.create('div', [{label: 'class', value: 'ul_nav'}]);
  let list = this.create('ul');
  this.renderLinks(list);
  divList.append(list);

  let divCart = this.create('div');
  let cartImg = this.create('img', [
   {label: 'src', value: './img/cart.jpg'},
   {label: 'alt', value: 'Cart'},
   {label: 'class', value: 'cart'}
  ]);
  let cartCount = createField('span', new Map([
   ['class', 'cart_count']
  ]));
  let cartAmount = createField('span', new Map([
   ['class', 'cart_amount']
  ]));
  divCart.append(cartCount, cartImg, cartAmount);
  element.append(divList, divCart);

  return element;
 }

 renderLinks(list) {
  this.data = this.menuLinks();
  this.data.forEach(dataList => {
   if (!dataList.hide) {
    let item = createField('li');
    let activeClass = (dataList.name === 'home') ? 'active' : '';
    let a = createField('a', new Map([
     ['href', `#${dataList.name}`],
     ['class', `link ${dataList.name} ${activeClass}`]
    ]));
    a.innerText = dataList.title;
    item.append(a);
    list.append(item);
   }
  });

  return list;
 }

 menuLinks() {
  return [
   {
    name: 'home',
    title: 'Home',
    hide: false
   },
   {
    name: 'cart',
    title: 'Cart',
    hide: false
   },
   {
    name: 'product',
    title: 'Product details',
    hide: true
   },
  ];
 }
}

export default new Nav().init();
