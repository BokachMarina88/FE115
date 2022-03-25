import GeneralComponent from "./GeneralCompanent";
import renderProducts from "./renderProducts";

export default class Main extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.render();
 }

 render() {
  let element = this.create('main', [{label: 'class', value: 'main'}]);
  document.getElementById('app').append(element);
 }

 pageRender(page) {
  console.log(page);
  // if (page.name === 'home') {
  //  renderProducts();
  // } else {
   let main = document.getElementsByClassName('main')[0];
   main.innerHTML = '';
   let h1 = document.createElement('h1');
   h1.innerText = page.title;
   let p = document.createElement('p');
   p.innerText = page.content;
   main.append(h1, p);
  // }

 }
}


