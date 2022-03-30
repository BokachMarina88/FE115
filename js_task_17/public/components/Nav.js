import createField from "./RenderData";
import {create} from "./RenderData";

function Nav() {

 this.init = () => {
  let element = create('nav', [{label: 'class', value: 'nav'}]);

  let divList = create('div', [{label: 'class', value: 'ul_nav'}]);
  let list = create('ul');
  this.renderLinks(list);
  divList.append(list);

  let divCart = create('div');
  let cartImg = create('img', [
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

 this.renderLinks = (list) => {
  let data = this.menuLinks();
  data.forEach(dataList => {
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

 this.menuLinks = () => {
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
