import Contacts from "./contactData.js";
import RenderContactsForm from "./renderContactsForm.js";
import {inputs} from "./renderData.js"

export default class ContactsApp extends Contacts {
 constructor() {
  super();
 }

 addContact() {
  let data = inputs.reduce((obj, elem) => ({...obj, [elem[0].name]: elem[0].value}), {});
  this.add(data);
  inputs.forEach(elem => elem[0].value = '');

  RenderContactsForm();
 }

 editContact(event) {
  this.setContenteditableField(event.target.parentNode.parentNode, 'true');
  this.changeButtons(event.target);
 }

 saveContact(event, id) {
  let data = {};
  let editList = event.target.parentNode.parentNode;
  this.inputs.forEach((item) => {
   data[item.name] = editList.querySelector('.contacts_list_item_' + item.name).textContent;
  });
  this.edit(id, data);
  this.storage = this.contacts;

  this.setContenteditableField(event.target.parentNode.parentNode, 'false');
  this.changeButtons(event.target);
 }

 removeContact(id) {
  this.remove(id);
  this.storage = this.contacts;
  RenderContactsForm();
 }

 setContenteditableField(fields, boolValue) {
  this.inputs.forEach(item => {
   fields.querySelector('.contacts_list_item_' + item.name).setAttribute('contenteditable', boolValue);
  });
 }

 changeButtons(target) {
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

 set storage(data) {
  localStorage.setItem('contacts', JSON.stringify(data));
  document.cookie = 'storageExpiration=1; max-age: 864000';

  // if (!getCookie('storageExpiration') && localStorage.getItem('contacts')) {
  //  localStorage.removeItem('contacts');
  // }
 }

 get storage() {
  let localContactData = localStorage.getItem('contacts');
  if (localContactData && localContactData.length > 0) {
   return JSON.parse(localContactData);
  }

  return {};
 }

//  async getData() {
//   let url = 'https://jsonplaceholder.typicode.com/users';
//
//   await fetch(url)
//   .then(response => {
//     if (response.status === 200) {
//      return response.json();
//     }
//    }
//   )
//   .then(data => {
//    if (data) {
//     data.forEach(item => {
//      this.add(item);
//     });
//    }
//   });
//  }
}

// export function addContact(event) {
//  console.log("addContact");
//  event.preventDefault();
//  let data = inputs.reduce((obj, elem) => ({...obj, [elem[0].name]: elem[0].value}), {});
//  console.log("data");
//  console.log(data);
//  let contact = new Contacts();
//  contact.add(data);
//  // this.inputs.forEach(elem => elem.value = '');
//
//  // RenderContactsForm();
// }