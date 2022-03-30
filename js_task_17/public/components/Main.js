import renderProducts from "./RenderProducts";
import renderCart from "./RenderCart";
import {getStorage} from "./Storage";
import {getData, itemData} from "./ProductAPI";
import {clearTags, create} from "./RenderData";

function Main() {
 let element;

 this.init = () => {
  this.element = create('main', [{label: 'class', value: 'main'}]);

  window.addEventListener('hashchange', _ => {
   this.routing();
  });

  window.addEventListener('load', _ => {
   const a = document.querySelectorAll('.ul_nav a');
   a.forEach(a => {
    a.addEventListener('click', _ => {
     this.routing();
    })
   })
   this.routing();
  });

  return this.element;
 }

 this.pageRender = (hash) => {
  import(`./${hash}.js`).then(module => {
   this.element.innerHTML = '';
   this.element.append(module.default);
   this.fillPageData(hash);
  });
 }

 this.fillPageData = async (hash) => {
  if (!getStorage().length) {
   await getData();
  }
  if (hash === 'Home') {
   renderProducts();
  } else if (hash === 'Product') {
   let hash = window.location.hash.slice(1);
   if (hash.indexOf('/') !== -1) {
    let value = hash.split('/');
    if (!getStorage().length) {
     await itemData(value[1]);
    }
    renderProducts(value[1]);
   }
  } else if (hash === 'Cart') {
   renderCart();
  }
 }

 this.getHash = () => {
  let hash = location.hash.slice(1);
  if (hash.indexOf('/') !== -1) {
   let value = hash.split('/');
   hash = value[0];
  }

  if (hash === '') {
   hash = 'home';
  }

  clearTags('.active', hash);

  return hash[0].toUpperCase() + hash.substring(1);
 }

 this.routing = () => {
  let hash = this.getHash();
  this.pageRender(hash);
 }
}

export default new Main().init();


