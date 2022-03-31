import createField, {addClasses, removeClasses} from './RenderData.js';
import {getStorage} from "./Storage";
import {getCookie, setCookie} from "./Cookies";
import {cartAmount, cartSum} from "./RenderCart";

export default function renderProducts(id = null) {
 let dataList;
 let arr;
 let disabledArr = ['id'];

 let main = document.querySelector('.main');
 let productsList = document.createElement('ul');
 productsList.setAttribute('class', 'products_list');
 main.append(productsList);

 if (id === null) {
  arr = ['title', 'price'];
  dataList = getStorage();
 } else {
  disabledArr = [...disabledArr, 'image'];
  dataList = getStorage().filter(elem => elem.id === +id ? elem : null);
 }

 dataList.map(elem => {
  let elemList = createField('li', new Map([
   ['class', 'list_item']
  ]));

  Object.entries(elem).forEach((item) => {
   if (item[0] === 'image') {
    let divName = createField('div', new Map([
     ['class', `${item[0]}`]
    ]));
    let imgUrl = (id === null) ? `/#product/${elem['id']}` : '#';
    let a = createField('a', new Map([
     ['href', imgUrl],
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
   if (!disabledArr.includes(item[0])) {
    let divName = createField('div');
    if (id === null) {
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
    } else {
     if (item[0] === 'rating') {
      Object.entries(item[1]).forEach((elem) => {
       let divName = createField('div');
       let labelId = createField('span', new Map([
        ['class', `label_element label_${elem[0]}`]
       ]));
       labelId.textContent = elem[0];
       let elemName = createField('span', new Map([
        ['class', `element ${elem[0]}`]
       ]));
       elemName.innerText = elem[1];
       divName.append(labelId, elemName);
       div.append(divName)
       elemList.append(div);
      });
     } else {
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
    }
    div.append(divName)
    elemList.append(div);
   }
  });

  let divButtons = createField('div', new Map([
   ['class', 'buttons']
  ]));
  let addBtn = createField('a', new Map([
   ['class', 'button add_cart_button']
  ]));
  addBtn.innerText = 'Add to cart';
  let input = createField('input', new Map([
   ['type', 'number'],
   ['class', 'points'],
   ['step', '1'],
   ['value', '1'],
   ['min', '1']
  ]));

  let cartElem = createField('p', new Map([
   ['class', 'in_cart'],
  ]));
  cartElem.textContent = 'Was added to cart';
  if (getCookie(+elem['id']).length) {
   addClasses('hide_button', input, addBtn);
  } else {
   addClasses('hide_button', cartElem);
   addClasses('show_button', addBtn, input);
  }

  divButtons.append(input, addBtn, cartElem);
  elemList.append(divButtons);
  productsList.append(elemList);

  addBtn.addEventListener('click', event => {
   setCookie(event.target, +elem['id']);
   if (getCookie(+elem['id']).length) {
    if (addBtn.classList.contains('show_button')) {
     removeClasses('show_button', addBtn, input)
     addClasses('hide_button', addBtn, input);
     removeClasses('hide_button', cartElem)
     addClasses('show_button', cartElem);
    }
    cartSum();
    cartAmount();
   }
  });
 });

 cartSum();
 cartAmount();
}