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

export function clearTags(className, element) {
 let elem = document.querySelectorAll(className);
 if (elem.length > 0) {
  elem.forEach(item => item.classList.remove(className.slice(1)));
 }

 let menuArr = ['product'];
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