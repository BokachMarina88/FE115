import createField, {addClasses, create, removeClasses} from "./RenderData";
import {getStorage} from "./Storage";
import {getCookie, setCookie} from "./Cookies";
import cart from "./Cart";

function Product() {
 this.title = 'Product';

 this.render = (id) => {
  let dataList;
  let disabledArr = ['id', 'image'];

  let page = create('div', [{label: 'class', value: 'product_page'}], `<h1>Product Page</h1>`);
  let productsList = create('ul', [{label: 'class', value: 'products_list'}]);
  page.append(productsList);

  dataList = getStorage().filter(elem => elem.id === +id ? elem : null);
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

      let elemName = createField('img', new Map([
       ['class', `${item[0]}`],
       ['src', item[1]],
       ['alt', item[0]]
      ]));

      divName.append(elemName);
      elemList.append(divName);
     }
    });

    let div = createField('div', new Map([
     ['class', 'description']
    ]));
    Object.entries(elem).forEach((item) => {
     if (!disabledArr.includes(item[0])) {
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
      cart.refresh();
     }
    });
   });
  }
  cart.refresh();

  return page;
 }
}

let product = new Product();
let title = product.title;

export default product;
export {title};