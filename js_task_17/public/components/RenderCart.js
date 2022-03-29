import createField from './RenderData.js';
import {getStorage} from "./Storage";
import {getCookies, removeValueCookie} from "./Cookies";

export default function renderCart() {
 let arrCart = [];
 let dataList = [];
 let main = document.querySelector('.main');

 let getCook = getCookies();
 if (getCook.length) {
  getCook.forEach(item => arrCart.push(item.key));
  dataList = getStorage().filter(item => (arrCart.includes(item.id)) ? item : null);
 }

 if (dataList.length) {
  let arr = ['id', 'title', 'price'];

  let productsList = document.createElement('ul');
  productsList.setAttribute('class', 'products_list');
  main.append(productsList);

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
      ['class', `${item[0]}`]
     ]));
     elemName.src = item[1];
     elemName.alt = item[0];
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
    if (arr.includes(item[0])) {
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
   divTotal.value = cartPointsByElement(elem['id']);

   let divButtons = createField('div', new Map([
    ['class', 'buttons']
   ]));
   let removeBtn = createField('a', new Map([
    ['class', 'button remove_cart_button'],
    ['id', `${elem['id']}`]
   ]));
   removeBtn.innerText = 'Remove from cart';
   divButtons.append(divTotal, removeBtn);
   elemList.append(divButtons);
   productsList.append(elemList);

   removeBtn.addEventListener('click', event => {
    event.preventDefault();
    removeValueCookie(event.target);
    document.querySelector('.products_list').remove();
    renderCart();
    cartSum();
    cartAmount();
   });
  });
 } else {
  main.innerHTML = 'No products in cart';
 }
 cartSum();
 cartAmount();
}

export function cartSum() {
 let count = 0;
 getCookies().forEach(item => count += item.value);

 let elemCount = document.querySelector('.cart_count');
 if (elemCount) {
  elemCount.textContent = count.toString();
 } else {
  elemCount.textContent = count.toString();
 }
}

export function cartAmount() {
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
  amount.textContent = "";
 }
}

export function cartPointsByElement(id) {
 let elemPoint = '';
 getCookies().forEach(item => (item.key === id) ? elemPoint = item.value : null);

 return elemPoint;
}