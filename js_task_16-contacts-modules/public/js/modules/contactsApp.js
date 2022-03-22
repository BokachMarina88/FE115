import Contacts from "./contactData.js";
import RenderContactsForm from "./renderContactsForm.js";
import {inputs} from "./renderData.js"
import {setContenteditableField, changeButtons, getCookie} from "./renderData.js"

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
  setContenteditableField(event.target.parentNode.parentNode, 'true');
  changeButtons(event.target);
 }

 saveContact(event, id) {
  let data = {};
  let editList = event.target.parentNode.parentNode;
  inputs.forEach((item) => {
   data[item[0].name] = editList.querySelector('.contacts_list_item_' + item[0].name).textContent;
  });
  this.edit(id, data);
  this.storage = this.contacts;

  setContenteditableField(event.target.parentNode.parentNode, 'false');
  changeButtons(event.target);
 }

 removeContact(id) {
  this.remove(id);
  this.storage = this.contacts;

  RenderContactsForm();
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

}
