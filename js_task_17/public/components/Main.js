import GeneralComponent from "./GeneralCompanent";
import renderProducts from "./renderProducts";
import renderCart from "./renderCart";
import {getStorage} from "./storage";
import {getData} from "./ProductAPI";

class Main extends GeneralComponent {
 constructor() {
  super();
  this.element;
 }

 init() {
  this.element = this.create('main', [{label: 'class', value: 'main'}]);

  this.routing();
  window.addEventListener('hashchange', async _ => {
   this.routing();
  });

  return this.element;
 }

 async pageRender(hash) {
  import(`./${hash}.js`).then(module => {
   this.element.innerHTML = '';
   this.element.append(module.default);
   this.fillPageData(hash);
  });
 }

 fillPageData(hash) {
  if (hash === 'Home') {
   renderProducts();
  } else if (hash === 'Product') {
   let hash = window.location.hash.slice(1);
   if (hash.indexOf('/') !== -1) {
    let value = hash.split('/');
    renderProducts(value[1]);
   }
  } else if (hash === 'Cart') {
   renderCart();
  }
 }

 getHash() {
  let hash = location.hash.slice(1);
  if (hash.indexOf('/') !== -1) {
   let value = hash.split('/');
   hash = value[0];
  }

  if (hash === '') {
   hash = 'home';
  }

  return hash[0].toUpperCase() + hash.substring(1);
 }

 async routing() {
  if (!getStorage().length) {
   await getData();
  }
  let hash = this.getHash();
  this.pageRender(hash);
 }
}

export default new Main().init();


