import createField from './renderData.js';
import {getStorage} from "./storage";
import {getCookies, removeCookie} from "./cookies";

export default function renderCart() {
 let arrIds = [];
 let dataList = [];
 let main = document.querySelector('.main');

 arrIds = getCookies();
 if (arrIds.length) {
  dataList = getStorage().filter(item => (arrIds.includes(item.id)) ? item : null);
 }

 if (dataList.length) {
  let arr = ['id', 'title', 'price'];

  main.innerHTML = '';
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

   let divButtons = createField('div', new Map([
    ['class', 'cart_buttons']
   ]));
   let removeBtn = createField('a', new Map([
    ['class', 'button remove_cart_button'],
    ['id', `${elem['id']}`]
   ]));
   removeBtn.innerText = 'Remove from cart';
   divButtons.append(removeBtn);
   elemList.append(divButtons);
   productsList.append(elemList);

   removeBtn.addEventListener('click', event => {
    event.preventDefault();
    removeCookie(+event.target.id)
   });
  });
 } else {
  main.innerHTML = 'No products in cart';
 }
}