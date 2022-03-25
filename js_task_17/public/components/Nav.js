import GeneralComponent from "./GeneralCompanent";
import Main from "./Main";


export default class Nav extends GeneralComponent {
 constructor() {
  super();
  this.data;
  // this.hash = 'home';
 }

 init() {
  this.render();
 }

 render() {
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
  document.getElementById('app').append(element);

  window.addEventListener('hashchange', async () => {
   let hash = window.location.hash.slice(1);
   console.log(this.hash);
   let page = this.data.find(page => {
    return page.name === hash ? page : null;
   });

   let main = new Main();
   main.pageRender(page);
  });
 }

 renderLinks(list) {
  this.data = this.menuLinks();
  this.data.forEach(dataList => {
   let item = document.createElement('li');
   let a = document.createElement('a');
   a.setAttribute('href', `#${dataList.name}`);
   a.innerText = dataList.title;
   item.append(a);
   list.append(item);
  });

  return list;
 }

 menuLinks() {
  return [
   {
    name: 'home',
    title: 'Home',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur cum dolores ducimus eius eveniet ex facere, ipsa iusto laborum laudantium minus odit pariatur perspiciatis possimus quis velit. Necessitatibus.'
   },
   {
    name: 'cart',
    title: 'Cart',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur cum dolores ducimus eius eveniet ex facere, ipsa iusto laborum laudantium minus odit pariatur perspiciatis possimus quis velit. Necessitatibus.'
   },
   {
    name: 'product',
    title: 'Product details',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur cum dolores ducimus eius eveniet ex facere, ipsa iusto laborum laudantium minus odit pariatur perspiciatis possimus quis velit. Necessitatibus.'
   },
  ];
 }
}


