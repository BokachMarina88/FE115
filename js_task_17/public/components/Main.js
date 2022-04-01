import {clearTags, create} from "./RenderData";
import product from "./Product";
import {getData} from "./ProductAPI";
import Spinner from "./Spinner";
import {getStorage} from "./Storage";

function Main() {

 this.init = () => {
  this.element = create('main', [{label: 'class', value: 'main'}]);

  window.addEventListener('hashchange', async _ => {
   await this.routing();
  });

  window.addEventListener('load', async _ => {
   const a = document.querySelectorAll('.ul_nav a');
   a.forEach(a => {
    a.addEventListener('click', async _ => {
     await this.routing();
    })
   })
   await this.routing();
  });

  return this.element;
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

 this.routing = async () => {
  let loading = Spinner();
  this.element.append(loading);

  if (!getStorage().length) {
   await getData();
  }

  let hash = this.getHash();

  if (hash === 'Product') {
   let localHash = window.location.hash.slice(1);
   if (localHash.indexOf('/') !== -1) {
    let value = localHash.split('/');
    let item = product.render(value[1]);
    this.element.innerHTML = '';
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
}

export default new Main().init();


