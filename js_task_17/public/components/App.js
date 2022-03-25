import Header from "./Header";
import Main from "./Main";
import Nav from "./Nav";
import Footer from "./Footer";
import GeneralComponent from "./GeneralCompanent";

export default class App extends GeneralComponent {
 constructor() {
  super();
 }

 async init() {
  // if (!this.storage.length) {
  //  await this.getData();
  // }

  this.renderHead();
  this.create('div', [{label: 'id', value: 'app'}]);
  this.render(document.body, this.create('div', [{label: 'id', value: 'app'}]));

  new Header().init();
  new Nav().init();
  new Main().init();
  new Footer().init();
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


