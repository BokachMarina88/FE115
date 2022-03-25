import App from "./App";

export default class Main extends App{
 constructor() {
  super();
 }

 init() {
  this.create();
 }

 create() {
  let element = document.createElement('main');
  element.setAttribute('class', 'main');
  element.innerHTML = '';

  return element;
 }
}


