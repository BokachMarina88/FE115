import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import GeneralComponent from "./GeneralCompanent";
import {getStorage, setStorage} from './storage.js';

export default class App extends GeneralComponent {
 constructor() {
  super();
 }

 async init() {
  if (!getStorage().length) {
   await this.getData();
  }

  this.renderHead();
  this.create('div', [{label: 'id', value: 'app'}]);
  this.render(document.body, this.create('div', [{label: 'id', value: 'app'}]));

  new Header().init();
  new Nav().init();
  new Footer().init();
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
    setStorage(data);
   }
  });
 }
}


