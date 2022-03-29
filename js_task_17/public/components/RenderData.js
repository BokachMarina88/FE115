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

 if (element !== 'product') {
  document.querySelector('.' + element).classList.add(className.slice(1));
 }
}

export function addClasses(className, ...elements) {
 elements.forEach(element => element.classList.add(className));
}

export function removeClasses(className, ...elements) {
 elements.forEach(element => element.classList.remove(className));
}