import {getStorage} from "./Storage";
import {getData} from "./ProductAPI";
import {clearTags, create} from "./RenderData";
import product from "./Product";

function Main() {

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
  if (hash === 'Product') {
   let localHash = window.location.hash.slice(1);
   if (localHash.indexOf('/') !== -1) {
    let value = localHash.split('/');
    let item = product.render(value[1]);
    this.element.append(item);
    document.title = product.title;
   }
  } else {
   import(`./${hash}.js`).then(module => {
    this.element.innerHTML = '';
    this.element.append(module.default);
    document.title = module.title;
   });
  }
 }

 this.fillPageData = async (hash) => {
  if (!getStorage().length) {
   await getData();
  }

 }

 this.getHash = () => {
  let hash = location.hash.slice(1);
  if (hash.indexOf('/') !== -1) {
   let value = hash.split('/');
   hash = value[0];
  }

  if (hash === '' || hash === 'home') {
   hash = 'catalog';
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


