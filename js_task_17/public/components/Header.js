import App from "./App.js";

export default class Header extends App {
 constructor() {
  super();
 }

 init() {
  this.create();
 }

 create() {
  let element = document.createElement('header');
  element.setAttribute('class', 'header');
  element.innerHTML = '';

  return element;
 }
}


