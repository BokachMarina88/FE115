import GeneralComponent from "./GeneralCompanent";
import renderProducts from "./renderProducts";
import Nav from "./Nav";
import renderCart from "./renderCart";

export default class Main extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.show();
 }

 show() {
  let element = this.create('main', [{label: 'class', value: 'main'}]);
  this.render(document.getElementById('app'), element);

  let hash = window.location.hash.slice(1);
  this.showPage(hash);

  window.addEventListener('hashchange', async () => {
   hash = window.location.hash.slice(1);
   this.showPage(hash);
  });
 }

 pageRender(page) {
  let main = document.querySelector('.main');
  main.innerHTML = '';

  if (page.name === 'home') {
   renderProducts();
  } else if (page.name === 'product') {
   let hash = window.location.hash.slice(1);
   if (hash.indexOf('/') !== -1) {
    let value = hash.split('/');
    renderProducts(value[1]);
   }
  } else if (page.name === 'cart') {
   renderCart();
  }
 }

 showPage(hash) {
  if (hash.indexOf('/') !== -1) {
   let value = hash.split('/');
   hash = value[0];
  }

  if (hash === '') {
   hash = 'home';
  }

  let nav = new Nav();
  let data = nav.menuLinks();

  let page = data.find(page => {
   return page.name === hash ? page : null;
  });

  this.pageRender(page);
 }
}


