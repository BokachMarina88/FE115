export default function createField(formElem, elemAttrs = []) {
 let exceptTags = ['div', 'li', 'button', 'span', 'input', 'p', 'a'];
 let field = document.createElement(formElem);

 if (!exceptTags.includes(formElem)) {
  field.setAttribute('class', formElem);
 }

 if (elemAttrs.size > 0) {
  elemAttrs.forEach((item, key) => {
   field.setAttribute(key, item);
  })
 }

 return field;
}

export function clearTags(className, element) {
 let elem = document.querySelectorAll(className);
 if (elem.length > 0) {
  elem.forEach(item => item.classList.remove(className.slice(1)));
 }

 let menuArr = ['product', 'catalog'];
 if (!menuArr.includes(element)) {
  document.querySelector('.' + element).classList.add(className.slice(1));
 }
}

export function addClasses(className, ...elements) {
 elements.forEach(element => element.classList.add(className));
}

export function removeClasses(className, ...elements) {
 elements.forEach(element => element.classList.remove(className));
}

export function create(type, options = [], text = '') {
 let element = document.createElement(type);

 if (options.length) {
  options.forEach(item => {
   element.setAttribute(item.label, item.value)
  })
 }
 if (text) {
  element.innerHTML = text;
 }

 return element;
}

export function render(to, ...elems) {
 elems.forEach(elem => to.appendChild(elem));
}