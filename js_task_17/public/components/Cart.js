import createField, {create} from "./RenderData";
import {getCookies, removeCookie, updateValueCookie} from "./Cookies";
import {getStorage} from "./Storage";

function Cart() {
 this.title = 'Cart';

 this.arr = ['id', 'title', 'price'];

 this.init = () => {
  console.log("rendCarter");
  return this.render();
 }

 this.render = () => {

  console.log("render");
  let arrCart = [];
  let dataList = [];

  let page = create('div', [{label: 'class', value: 'cart_page'}], `<h1>Cart Page</h1>`);
  let productsList = create('ul', [{label: 'class', value: 'products_list'}]);
  page.appendChild(productsList);

  let getCook = getCookies();
  if (getCook.length) {
   getCook.forEach(item => arrCart.push(item.key));
   dataList = getStorage().filter(item => (arrCart.includes(item.id)) ? item : null);
  }
  if (dataList.length) {
   dataList.map(elem => {
    let elemList = createField('li', new Map([
     ['class', 'list_item']
    ]));

    Object.entries(elem).forEach((item) => {
     if (item[0] === 'image') {
      let divName = createField('div', new Map([
       ['class', `${item[0]}`]
      ]));
      let a = createField('a', new Map([
       ['href', `/#product/${elem['id']}`],
      ]));

      let elemName = createField('img', new Map([
       ['class', `${item[0]}`],
       ['src', item[1]],
       ['alt', item[0]]
      ]));

      divName.append(a);
      a.append(elemName);
      elemList.append(divName);
     }
    });

    let div = createField('div', new Map([
     ['class', 'description']
    ]));
    Object.entries(elem).forEach((item) => {
     let divName = createField('div');
     if (this.arr.includes(item[0])) {
      let labelId = createField('span', new Map([
       ['class', `label_element label_${item[0]}`]
      ]));
      labelId.textContent = item[0];
      let elemName = createField('span', new Map([
       ['class', `element ${item[0]}`]
      ]));
      elemName.innerText = item[1];
      divName.append(labelId, elemName);
     }
     div.append(divName)
     elemList.append(div);
    });

    let divTotal = createField('input', new Map([
     ['type', 'number'],
     ['class', 'total'],
     ['step', '1'],
     ['value', '1'],
     ['min', '1']
    ]));
    divTotal.value = this.cartPointsByElement(elem['id']);

    let divButtons = createField('div', new Map([
     ['class', 'buttons']
    ]));
    let removeBtn = createField('a', new Map([
     ['class', 'button remove_cart_button']
    ]));
    removeBtn.innerText = 'Remove from cart';
    divButtons.append(divTotal, removeBtn);
    elemList.append(divButtons);
    productsList.append(elemList);

    removeBtn.addEventListener('click', event => {
     removeCookie(+elem['id']);
     // this.render();
     event.target.closest('.list_item').remove();
     this.refresh();
    });

    divTotal.addEventListener('click', event => {
     updateValueCookie(event.target, +elem['id']);
     this.refresh();
    });
   });
  } else {
   page.innerHTML = 'No products in cart';
  }
  this.refresh();

  return page;
 }

 this.cartSum = () => {
  let count = 0;
  getCookies().forEach(item => count += item.value);

  let elemCount = document.querySelector('.cart_count');
  if (elemCount) {
   elemCount.textContent = count.toString();
  } else {
   elemCount = createField('span', new Map([
    ['class', 'cart_count']
   ]));
  }
  elemCount.textContent = count.toString();
 }

 this.cartAmount = () => {
  let sum = 0;
  let amount = document.querySelector('.cart_amount');
  if (amount && getCookies().length) {
   let elemPoint = 0;
   let getCookKeys = [];
   if (getCookies().length) {
    getCookies().forEach(item => {
     getCookKeys.push(item.key);
    });
   }
   getStorage().filter(item => {
    if (getCookKeys.includes(item.id)) {
     getCookies().forEach(elem => (elem.key === item.id) ? elemPoint = elem.value : null);
     sum += item.price * elemPoint;
    }
   });
   amount.textContent = sum.toFixed(3).toString();
  } else {
   amount = createField('span', new Map([
    ['class', 'cart_amount']
   ]));
   amount.textContent = "";
  }
 }

 this.cartPointsByElement = (id) => {
  let elemPoint = '';
  getCookies().forEach(item => (item.key === id) ? elemPoint = item.value : null);

  return elemPoint;
 }

 this.refresh = () => {
  this.cartSum();
  this.cartAmount();
 }
}

let cart = new Cart();
let init = cart.init();
let title = cart.title;
let refresh = cart.refresh();

export default init;
export {title, refresh, cart};
