import createField from './renderData.js';
import App from './App.js';

export default function renderProducts() {
 let main = document.querySelector('.main');
 let productsList = document.createElement('ul');
 productsList.setAttribute('class', 'products_list');
 main.append(productsList);

 let products = new App();
 let dataList = products.storage;

 dataList.map(elem => {
   let elemList = createField('li', new Map([
    ['class', 'list_item']
   ]));

   Object.entries(elem).forEach((item) => {
    if (item[0] === 'image') {
     let divName = createField('div', new Map([
      ['class', `${item[0]}`]
     ]));

     let elemName = createField('img', new Map([
      ['class', `${item[0]}`]
     ]));
     elemName.src = item[1];
     elemName.alt = item[0];
     divName.append(elemName);
     elemList.append(divName);
    }
   });

   let div = createField('div', new Map([
    ['class', 'description']
   ]));
   Object.entries(elem).forEach((item) => {
    let divName = createField('div');

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
    } else if (item[0] !== 'image') {
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
    ['class', 'buttons']
   ]));
   let cartBtn = createField('button', new Map([
    ['class', 'add_cart_button']
   ]));
   cartBtn.innerText = 'Add to cart';
   divButtons.append(cartBtn);
   elemList.append(divButtons);
   productsList.append(elemList);

   cartBtn.addEventListener('click', event => {
    // this.editContact(event);
   })
  }
 )
 ;
}