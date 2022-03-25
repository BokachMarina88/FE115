import App from "./App";

export default class Footer extends App{
 constructor() {
  super();
 }

 init() {
  this.create();
 }

 create() {
  let element = document.createElement('footer');
  element.setAttribute('class', 'footer');
  element.innerHTML = '';

  return element;
 }
}


