export let inputs = [
 document.getElementsByName('name'),
 document.getElementsByName('email'),
 document.getElementsByName('address'),
 document.getElementsByName('phone')
];

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

export function setContenteditableField(fields, boolValue) {
 inputs.forEach(item => {
  fields.querySelector('.contacts_list_item_' + item[0].name).setAttribute('contenteditable', boolValue);
 });
}

export function changeButtons(target) {
 let saveButton;
 let editButton = target;

 if (target.className === 'contacts_list_item_edit_button') {
  saveButton = target.nextSibling;
 } else if (target.className === 'contacts_list_item_save_button') {
  saveButton = target.previousSibling;
 }

 saveButton.style.display = 'block';
 editButton.style.display = 'none';
}

export function getCookie(name) {
 let matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
 ));
 return matches ? decodeURIComponent(matches[1]) : undefined;
}