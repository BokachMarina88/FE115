import App from "./App";

export default class Nav extends App{
 constructor() {
  super();
 }

 init() {
  this.create();
 }

 create() {
  let element = document.createElement('nav');
  element.setAttribute('class', 'nav');
  element.innerHTML = '';

  return element;
 }
}


