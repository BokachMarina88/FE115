import Head from "./Head";
import Nav from "./Nav";
import Main from "./Main";
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
  this.render(document.body, this.create('div', [{label: 'id', value: 'app'}]));
  this.render(document.getElementById('app'), Head, Nav,  Main, Footer);
 }

 renderHead() {
  let meta = this.create('meta', [{label: 'charset', value: 'UTF-8'}]);
  let title = this.create('title', [], 'E_shop');
  let link = this.create('link', [{label: 'href', value: "./css/style.css"}, {
   label: 'rel',
   value: "stylesheet"
  }]);

  this.render(document.head, meta, title, link);
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


