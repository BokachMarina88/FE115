// import Header from "./Header";
// import Nav from "./Nav";
import Main from "./Main";
// import Footer from "./Footer";
import renderProducts from "./renderProducts";

export default class App {
 constructor() {
  this.element;
 }

 async init() {
  if (!this.storage.length) {
   await this.getData();
  }

  this.renderHead();
  this.create('div', [{label: 'id', value: 'app'}]);
  this.render(document.body, this.element);

  // console.log(new Header().init());
  // this.render(document.getElementById('app'), new Header().create());
  // this.render(document.getElementById('app'), new Nav().create());
  this.render(document.getElementById('app'), new Main().create());
  // this.render(document.getElementById('app'), new Footer().create());
  //
  renderProducts();
 }

 create(type, options = [], text = '') {
  let elem = document.createElement(type);

  if (options.length) {
   options.forEach(item => {
    elem.setAttribute(item.label, item.value)
   })
  }
  if (text) {
   elem.innerHTML = text;
  }
  this.element = elem;

  return elem;
 }

 render(to, elem) {
  to.append(elem);
 }

 renderHead() {

  this.render(document.head, this.create('meta', [{label: 'charset', value: 'UTF-8'}]));
  this.render(document.head, this.create('title', [], 'E_shop'));
  this.render(document.head, this.create('link', [{label: 'href', value: "./css/style.css"}, {
   label: 'rel',
   value: "stylesheet"
  }]));
 }

 async getData() {
  let url = 'https://fakestoreapi.com/products';
  await fetch(url)
  .then(response => {
    if (response.status === 200) {
     return response.json();
    }
   }
  )
  .then(data => {
   if (data) {
    this.storage = data
   }
  });
 }

 set storage(data) {
  localStorage.setItem('data', JSON.stringify(data));
 }

 get storage() {
  let localData = localStorage.getItem('data');
  if (localData && localData.length > 0) {
   return JSON.parse(localData);
  }

  return {};
 }
}


