export default class GeneralComponent {
 constructor() {
  this.element;
 }

 init() {
 }

 create(type, options = [], text = '') {
  this.element = document.createElement(type);

  if (options.length) {
   options.forEach(item => {
    this.element.setAttribute(item.label, item.value)
   })
  }
  if (text) {
   this.element.innerHTML = text;
  }

  return this.element;
 }

 render(to, ...elems) {
  elems.forEach(elem => to.appendChild(elem));
 }
}