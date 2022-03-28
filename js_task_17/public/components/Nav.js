import GeneralComponent from "./GeneralCompanent";
import Main from "./Main";
import renderProducts from "./renderProducts";


export default class Nav extends GeneralComponent {
 constructor() {
  super();
  this.data;
 }

 init() {
  this.show();
 }

 show() {
  let element = this.create('nav', [{label: 'class', value: 'nav'}]);

  let divList = this.create('div', [{label: 'class', value: 'ul_nav'}]);
  let list = this.create('ul');
  this.renderLinks(list);
  divList.append(list);

  let divCart = this.create('div');
  let сart = this.create('img', [
   {label: 'src', value: './img/logo.jpg'},
   {label: 'alt', value: 'Logo'},
   {label: 'class', value: 'logo'}
  ]);
  divCart.append(сart);

  element.append(divList, divCart);
  this.render(document.getElementById('app'), element);

  let hash = window.location.hash.slice(1);
  this.showPage(hash);

  window.addEventListener('hashchange', async () => {
   hash = window.location.hash.slice(1);
   this.showPage(hash);
  });
 }

 pageRender(page) {
  if (document.querySelector('.main') === null) {
   new Main().init();
  }
  let main = document.querySelector('.main');
  main.innerHTML = '';

  if (page.name === 'home') {
   renderProducts();
  }
  if (page.name === 'product') {
   let hash = window.location.hash.slice(1);
   if (hash.indexOf('/') !== -1) {
    let index = hash.indexOf('/');
    let id = hash.slice(index + 1);
    renderProducts(id);
   }
  } else {
   let h1 = document.createElement('h1');
   h1.innerText = page.title;
   let p = document.createElement('p');
   p.innerText = page.content;
   main.append(h1, p);
  }
 }

 showPage(hash) {
  if (hash.indexOf('/') !== -1) {
   let index = hash.indexOf('/');
   hash = hash.slice(0, index);
  }

  if (hash === '') {
   hash = 'home';
  }

  let page = this.data.find(page => {
   return page.name === hash ? page : null;
  });

  this.pageRender(page);
 }

 renderLinks(list) {
  this.data = this.menuLinks();
  this.data.forEach(dataList => {
   if(!dataList.hide) {
    let item = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', `#${dataList.name}`);
    a.innerText = dataList.title;
    item.append(a);
    list.append(item);
   }
  });

  return list;
 }

 menuLinks() {
  return [
   {
    name: 'home',
    title: 'Home',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur cum dolores ducimus eius eveniet ex facere, ipsa iusto laborum laudantium minus odit pariatur perspiciatis possimus quis velit. Necessitatibus.',
    hide: false
   },
   {
    name: 'cart',
    title: 'Cart',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur cum dolores ducimus eius eveniet ex facere, ipsa iusto laborum laudantium minus odit pariatur perspiciatis possimus quis velit. Necessitatibus.',
    hide: false
   },
   {
    name: 'product',
    title: 'Product details',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur cum dolores ducimus eius eveniet ex facere, ipsa iusto laborum laudantium minus odit pariatur perspiciatis possimus quis velit. Necessitatibus.',
    hide: true
   },
  ];
 }
}


