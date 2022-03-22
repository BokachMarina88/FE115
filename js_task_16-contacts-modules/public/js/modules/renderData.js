export default function createField(formElem, elemAttrs) {
 let exceptTags = ['div', 'li', 'button', 'span'];
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

export let inputs = [
 document.getElementsByName('name'),
 document.getElementsByName('email'),
 document.getElementsByName('address'),
 document.getElementsByName('phone')
];